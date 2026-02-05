import { Deck } from "../../component_management/deck";
import Component from "../../components/component";
import { IsPlayerProperty } from "../../core/player";

export class Hand extends IsPlayerProperty(Deck) {
    constructor(
        public name: string = "anon_hand",
        public contents: Component[] = [],
    ) {
        super(name, contents)
        this.active = true
        this.secret = true
    }
}