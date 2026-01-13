import { PlayerMove } from "../types"
import { Action } from "./action/action"

export type PhaseParams = Partial<{
    name: string
    loop: "forever" | number
    phases: Phase[]
}>

export class Phase {
    public name: string = "anon_phase"
    public loop: "forever" | number | undefined
    public phases: Phase[] | undefined

    constructor(config: PhaseParams) {
        Object.assign(this, config)
    }
}

export class PlayerMovePhase extends Phase {
    public allowed_moves: PlayerMove[] = []
    constructor(config: PhaseParams & { allowed_moves: PlayerMove[] }) {
        super(config)
        this.allowed_moves = config.allowed_moves
    }
}