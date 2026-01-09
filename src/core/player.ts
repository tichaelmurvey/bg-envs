import { Deck } from "../component_management/deck";
import { Constructor } from "../types"

export default class Player {
    name: string
    position: number
    constructor(
        name: string,
        position: number,
    ) {
        this.name = name;
        this.position = position;
    }
}

interface PlayerProperty {
    secret: boolean
    active: boolean
}

export function IsPlayerProperty<T extends Constructor>(Base: T) {
    return class extends Base implements PlayerProperty {
        secret = false;
        active = true
    }
}