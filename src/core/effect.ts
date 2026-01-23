import { Action } from "../types"

export class Effect {
    constructor(
        public name: string,
        public resolve_func: Action
    ) { }

    resolve(args?: any) {
        return this.resolve_func(args)
    }
}

export const default_effect = new Effect("default effect", () => { throw new Error("Default effect called") })