import Component from "../components/component";
import { shuffle } from "../utils/rng";

export class Deck {
    constructor(
        public name?: string,
        public items: Component[] = [],
    ) { }

    shuffle() {
        shuffle(this.items)
    }

    draw(): Component | null {
        if (this.items.length == 0) {
            this.handle_empty()
        }
        if (this.items.length == 0) {
            return null;
        }
        return this.items.pop()!;
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
        this.items.push(item)
    }

    handle_empty() {

    }
}