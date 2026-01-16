import { config } from "process"
import { PlayerMove } from "../types"
import { Action } from "./action/action"
import { GameInstance } from "./game_env"

export class Phase {
    name: string = "base_phase"
    loop: "forever" | number | undefined
    phases: Phase[] | undefined
    phase_data: undefined
    gst: GameInstance
    [x: string]: unknown

    constructor(gst: GameInstance) {
        this.gst = gst
    }
}

export class GameStart extends Phase {
    constructor(gst: GameInstance) {
        super(gst)
        this.name = "game_start"
        gst.game_running = true
    }
}

export class PlayerMovePhase extends Phase {
    constructor(gst: GameInstance,
        public allowed_moves: PlayerMove[]
    ) {
        super(gst)
    }
}