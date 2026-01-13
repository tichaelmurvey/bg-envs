import { Deck } from "../../component_management/deck";
import Component from "../../components/component";
import { IsPlayerProperty } from "../../core/player";

export class Hand extends IsPlayerProperty(Deck) {
    constructor(
        public name?: string,
        public items: Component[] = [],
    ) {
        super(name, items)
        this.active = true
        this.secret = true
    }
}