import { Action } from "./action/action"

export class Phase {
    constructor(
        public allowed_moves: Action[],
        public name: string = "phase"
    ) { }
}