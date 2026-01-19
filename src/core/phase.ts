import { config } from "process"
import { PlayerMove } from "../types"
import { Action } from "./action/action"
import { GameInstance } from "./game_env"

export class Phase {
    name: string = "base_phase"
    loop: "forever" | number | undefined
    times_called: number = 0
    phases: Phase[] | undefined
    active_phase: Phase | undefined
    phase_data: undefined
    gst: GameInstance
    [x: string]: unknown

    constructor(gst: GameInstance) {
        this.gst = gst
    }
    get_active_phase(): Phase {
        if (!this.active_phase) {
            return this
        }
        else {
            return this.active_phase.get_active_phase()
        }
    }
}

export class GameStart extends Phase {
    constructor(gst: GameInstance) {
        super(gst)
        this.name = "game_start"
        gst.game_running = true
    }
}