import Component from "../../components/component";
import { GameAction } from "../../core/action/game_action";
import { PLAYER_MOVES } from "../../core/action/moves_list";
import { PlayerMove } from "../../core/action/player_move";
import { Effect } from "../../core/effect";
import GameEnv from "../../core/game_env";
import { GameStart, Phase } from "../../core/phase";
import { ACTIONS_LIST } from "../../prefabs/actions/actions_list";
import { BASE_GAMES } from "../../prefabs/game_bases/base_game_list";
import { GameActionPhase } from "../../prefabs/sequences/game_action_phase";
import { PHASE_PREFABS } from "../../prefabs/sequences/phase_list";
import { PlayerMovePhase } from "../../prefabs/sequences/player_action_phase";
import { SequentialTurns } from "../../prefabs/sequences/turns/sequential_turns";
import { SimulTurns } from "../../prefabs/sequences/turns/simul_turns";
import { GameObject, PhaseRules, PlayerMoveName, Rulebook } from "../../types";
import parse_components from "./parse_components";
import parse_effect from "./parse_effect";
import { yamlFileToObj } from "./yaml_to_obj";

export function create_env_from_yaml(path: string) {
    //TODO: Validate yaml structure
    const rules = yamlFileToObj<Rulebook>(path);

    let BaseGameEnv = GameEnv;
    let base_game_data;
    if (rules.base_game && (rules.base_game.name in BASE_GAMES)) {
        base_game_data = BASE_GAMES[rules.base_game.name]
        BaseGameEnv = BASE_GAMES[rules.base_game.name].game
    }


    //Custom variables
    const custom_vars = Object.assign(BaseGameEnv.prototype.custom_vars, rules.custom_variables)

    //Custom components 
    const user_defined_components: Record<string, GameObject> = {}
    for (const key in rules.custom_components) {
        Object.assign(user_defined_components, parse_components(rules.custom_components[key]))
    }
    const component_starting_state = Object.assign(BaseGameEnv.prototype.component_starting_state, user_defined_components)

    //TODO: Custom effects
    const custom_effects: Record<string, Effect> = {}
    for (const key in rules.custom_effects) {
        custom_effects[key] = parse_effect(rules.custom_effects[key])
    }

    //TODO: Custom moves
    const custom_moves: Record<string, PlayerMove> = {}

    //TODO: custom_passives
    const custom_passives = []

    //TODO: custom_blockers
    const custom_blockers = []

    const prefab_phases = BaseGameEnv.prototype.phases
    const phases = create_phases(rules.phases, base_game_data?.prefab_phases)

    const game_env = new BaseGameEnv({
        player_min: rules.meta.player_min,
        player_max: rules.meta.player_max,
        phases,
        custom_vars,
        component_starting_state,

    })

}

function create_phases(phase_rules: PhaseRules[], prefabs?: Record<string, typeof Phase>): (typeof Phase)[] {
    return phase_rules.map(phase_def => {

        const PrefabPhase = use_prefab_phase(phase_def, prefabs)

        //Set loop behaviour
        let loop_value: number | undefined | "forever"
        if (typeof phase_def.loop === "number") {
            loop_value = Number(loop_value)
        } else if (phase_def.loop === "forever") {
            loop_value = "forever" as const
        } else if (typeof phase_def.loop !== "undefined") {
            throw new Error("Invalid loop value: " + loop_value)
        }


        //construct child phases
        let child_phases: (typeof Phase)[]
        if (phase_def.phases) {
            child_phases = create_phases(phase_def.phases, prefabs)
        }


        class NewPhase extends PrefabPhase {
            name = phase_def.name
            loop = loop_value
            phases = child_phases
        }
        return NewPhase

    })
}

function use_prefab_phase(phase_def: PhaseRules, prefabs?: Record<string, typeof Phase>): typeof Phase {
    //Use prefab
    if (prefabs && prefabs[phase_def.name] !== undefined) {
        return prefabs[phase_def.name]
    }

    if (phase_def.game_actions) {
        return class extends GameActionPhase {
            game_actions = phase_def.game_actions!.map(create_game_action)
        }
    }

    if (phase_def.allowed_moves) {
        const moves = phase_def.allowed_moves.map(create_player_move)
        switch (phase_def.turn_order) {
            case "circle": return class extends SequentialTurns { allowed_moves = moves };

            case "simultaneous": return class extends SimulTurns { allowed_moves = moves };

            case "custom": return class extends SequentialTurns {
                public turn_order = "custom" as const;
                allowed_moves = moves;
            };

            case undefined:
                return class extends SequentialTurns { allowed_moves = moves };
        }
    }

    class NewPhase extends Phase { }
    NewPhase.prototype.name = phase_def.name;
    return NewPhase
}

function create_game_action(game_action: { name: string, [x: string]: string }) {
    //Use a prefab action by name
    if (ACTIONS_LIST[game_action.name]) {
        const new_action: GameAction = new ACTIONS_LIST[game_action.name]
        for (const key in game_action) {
            new_action.config[key] = game_action[key]
        }
        return new_action
    }
    throw new Error("Tried to create game action without prefab/custom move")
}

function create_player_move(move_ref: string): PlayerMove {
    return new PLAYER_MOVES[move_ref];
}