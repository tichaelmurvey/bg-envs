import Component from "../components/component";
import { shuffle } from "../utils/rng";
import { ComponentManager } from "./component_manager";

export class Deck extends ComponentManager {
    contents: Component[]
    constructor(
        name: string,
        contents: Component[] = [],
    ) {
        super();
        this.name = name
        this.contents = contents
    }

    shuffle() {
        shuffle(this.contents)
    }

    draw(): Component | null {
        if (this.contents.length == 0) {
            this.handle_empty()
        }
        if (this.contents.length == 0) {
            return null;
        }
        return this.contents.pop()!;
    }

    draw_n(n: number): Component[] {
        const draws = []
        for (let i = 0; i < n; i++) {
            const new_draw = this.draw()
            if (new_draw != null) {
                draws.push(new_draw)
            }
        }
        return draws
    }

    add(item: Component | null) {
        if (item == null) return;
        this.contents.push(item)
    }

    handle_empty() {

    }
}