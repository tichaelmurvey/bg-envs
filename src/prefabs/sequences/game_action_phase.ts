import { Action } from "../../core/action/action"
import { GameAction } from "../../core/action/game_action"
import { GameInstance } from "../../core/game_env"
import { Phase } from "../../core/phase"

export class GameActionPhase extends Phase {
    public game_actions: GameAction[] = []
    constructor(gst: GameInstance) {
        super(gst)
    }

    run() {
        this.game_actions.forEach(action => {
            action.effect.resolve()
        })
    }
}
