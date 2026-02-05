import { ComponentManager } from "../component_management/component_manager";
import { Deck } from "../component_management/deck";
import GameObject from "../components/game_object";
import { Constructor } from "../types"

export default class Player extends ComponentManager {
    name: string
    position: number
    constructor(
        name: string,
        position: number,
    ) {
        super()
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