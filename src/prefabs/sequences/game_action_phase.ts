import { Action } from "../../core/action/action"
import { Phase, PhaseParams } from "../../core/phase"

export class GameActionPhase extends Phase {
    public action_sequence: Action[] = []
    constructor(config: PhaseParams & { action_sequence: Action[] }) {
        super(config)
        this.action_sequence = config.action_sequence
    }

    run() {
        this.action_sequence.forEach(action => {
            //TODO: Execute action
        })
    }
}
