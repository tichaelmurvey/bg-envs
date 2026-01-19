import { default_effect, Effect } from "../effect"

export class Action {
    name: string = "base_action"
    config: {
        target?: string
        [x: string]: string | undefined
    } = {}
    effect = default_effect
    constructor(
        public effectArgs?: unknown[]
    ) { }
}