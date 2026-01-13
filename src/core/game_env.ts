import { ComponentState } from "../types"
import { Action } from "./action/action"
import { Phase } from "./phase"
import Player from "./player"

export type GameEnvParams = Partial<{
    phases: Phase[],
    actions: Action[],
    player: typeof Player,
    player_min: Number,
    player_max: Number,
    component_starting_state: ComponentState
}>

class GameEnv {
    public phases: Phase[] = []
    public actions: Action[] = []
    public player: typeof Player = Player
    public player_min: Number = 2
    public player_max: Number = 7
    public component_starting_state: ComponentState = {}

    constructor(config: GameEnvParams) {
        Object.assign(this, config);
    }

    new_game(n_players: number = 2) {
        return new GameInstance(this, n_players)
    }

    glossary = {
    }
}

export class GameInstance {
    component_state: ComponentState
    players: Player[] = []
    constructor(
        readonly game_env: GameEnv,
        public n_players: number = 2,
    ) {
        this.component_state = structuredClone(this.game_env.component_starting_state)
        this.define_players()
    }

    define_players() {
        for (let i = 0; i < this.n_players; i++) {
            this.players.push(new this.game_env.player(`Player ${i + 1}`, i))
        }
    }
}

export default GameEnv

