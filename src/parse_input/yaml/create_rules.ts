import GameEnv from "../../core/game_env";
import { Phase } from "../../core/phase";
import { BASE_GAMES } from "../../prefabs/game_bases/base_game_list";
import { GameActionPhase } from "../../prefabs/sequences/game_action_phase";
import { PlayerMovePhase } from "../../prefabs/sequences/player_action_phase";
import { PhaseRules, PlayerMove, Rulebook } from "../../types";
import { yamlFileToObj } from "./yaml_to_obj";

export function create_env_from_yaml(path: string) {
    //TODO: Validate yaml structure
    const rules = yamlFileToObj<Rulebook>(path);
    let MyGameEnv = GameEnv
    if (rules.base_game && (rules.base_game.name in BASE_GAMES)) {
        MyGameEnv = BASE_GAMES[rules.base_game.name]
    }

    const phases = create_phases(rules.phases, MyGameEnv)

    const game_env = new MyGameEnv({
        player_min: rules.meta.player_min,
        player_max: rules.meta.player_max,

    })

}

function create_phases(phase_rules: PhaseRules[], base_game: typeof GameEnv) {
    return phase_rules.map(phase_def => {

        //Use prefab
        let NewPhase;
        if (phase_def.name) {

        }
        else if (phase_def.game_actions) {
            class X extends GameActionPhase { }
            NewPhase = X
            NewPhase.prototype.game_actions = phase_def.game_actions
        } else if (phase_def.allowed_moves) {
            class X extends PlayerMovePhase { }
            NewPhase = X
            NewPhase.prototype.allowed_moves = phase_def.allowed_moves as unknown as PlayerMove[] //TODO: Actual validation here
        } else {
            class X extends Phase { }
            NewPhase = X
        }

        //Set name
        NewPhase.prototype.name = phase_def.name;

        //Set loop behaviour
        if (typeof phase_def.loop !== "number" && typeof phase_def.loop !== "undefined" && phase_def.loop !== "forever") {
            throw new Error("Invalid loop value: " + phase_def.loop)
        }
        NewPhase.prototype.loop = phase_def.loop




    })
}