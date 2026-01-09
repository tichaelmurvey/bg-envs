import { Deck } from "../component_management/deck";
import Component from "../components/component";
import { IsPlayerProperty } from "../core/player";

export class Hand extends IsPlayerProperty(Deck) {
    constructor(
        name?: string,
        items_init: Component[] = [],
    ) {
        super(name, items_init)
        this.secret = true
        this.active = true
    }

}