import { PlayerMove } from "../types"
import { Action } from "./action/action"

export type PhaseParams = Partial<{
    name: string
    loop: "forever" | number
    allowed_moves: PlayerMove[]
    phases: Phase[]
}>

export class Phase {
    public name: string = "anon_phase"
    public loop: "forever" | number | undefined
    public allowed_moves: PlayerMove[] = []
    public phases: Phase[] | undefined

    constructor(config: PhaseParams) {
        Object.assign(this, config)
    }
}