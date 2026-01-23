import { ActionGlossary, ComponentGlossary, CustomVars, EffectGlossary, MoveGlossary } from "../parse_input/yaml/yaml_types"
import { Action, ComponentState, EnumType } from "../types"
import { GameStart, Phase } from "./phase"
import Player from "./player"

export type GameEnvParams = Partial<{
    phases: (typeof Phase)[],
    player: typeof Player,
    player_min: Number,
    player_max: Number,
    custom_vars: Record<string, string | boolean | number>
    component_glossary: ComponentGlossary
    effect_glossary: EffectGlossary
    action_glossary: ActionGlossary
    move_glossary: MoveGlossary
    component_starting_state: ComponentState
}>

class GameEnv {
    phases: (typeof Phase)[] = [GameStart]
    player: typeof Player = Player
    player_min: Number = 2
    player_max: Number = 7
    component_starting_state: ComponentState = {}
    component_glossary: ComponentGlossary = {}
    effect_glossary: EffectGlossary = {}
    action_glossary: ActionGlossary = {}
    move_glossary: MoveGlossary = {}
    custom_vars: CustomVars = {}
    custom_consts: CustomVars = {}
    constructor(config: GameEnvParams) {
        Object.assign(this, config);
    }

    new_game(n_players: number = 2) {
        return new GameInstance(this, n_players)
    }

    glossary = {
    }
}

export type PhaseTree = { prototype: Phase, data: unknown, current_phase?: PhaseTree }

export class GameInstance {
    component_state: ComponentState
    players: Player[] = []
    current_phase: Phase
    game_running: boolean = false
    custom_vars: CustomVars = {}
    component_glossary: ComponentGlossary = {}
    action_glossary: ActionGlossary = {}
    constructor(
        readonly game_env: GameEnv,
        public n_players: number = 2,
    ) {
        this.component_state = structuredClone(this.game_env.component_starting_state)
        this.define_players()
        this.current_phase = new game_env.phases[0](this)
        this.custom_vars = structuredClone(this.game_env.custom_vars)
    }

    define_players() {
        for (let i = 0; i < this.n_players; i++) {
            this.players.push(new this.game_env.player(`Player ${i + 1}`, i))
        }
    }

    get_active_phase() {
        return this.current_phase.get_active_phase()
    }
}

export default GameEnv

