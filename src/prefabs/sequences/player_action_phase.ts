import { Action } from "../../core/action/action"
import { PlayerMove } from "../../core/action/player_move"
import { GameInstance } from "../../core/game_env"
import { Phase } from "../../core/phase"
import { PlayerMoveName } from "../../types"

export class PlayerMovePhase extends Phase {
    public allowed_moves: PlayerMove[] = []
}
