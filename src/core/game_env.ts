import { Phase } from "./phase"

export class GameEnv {
    n_players: number | undefined
    phases: Phase[]
    constructor(phases: Phase[]) {
        this.phases = phases
    }

    new_game(players: number) {
        this.n_players = players

    }
}

export default GameEnv