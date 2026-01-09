import { ComponentState } from "../types"
import { Action } from "./action/action"
import { Phase } from "./phase"
import Player from "./player"

class GameEnv {
    constructor(
        public phases: Phase[],
        public actions: Action[],
        public player: typeof Player,
        public component_starting_state: ComponentState
    ) { }

    new_game(n_players: number = 2) {
        return new GameInstance(this, n_players)
    }
}

class GameInstance {
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

