import { Action } from "../../core/action/action"
import { GameInstance } from "../../core/game_env"
import { Phase } from "../../core/phase"
import { PlayerMove } from "../../types"

export class PlayerMovePhase extends Phase {
    public allowed_moves: PlayerMove[] = []
    constructor(gst: GameInstance) {
        super(gst)
    }

}
