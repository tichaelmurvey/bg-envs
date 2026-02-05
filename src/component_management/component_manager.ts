import Component from "../components/component"
import GameObject from "../components/game_object";
import { Deck } from "./deck"

export class ComponentManager extends GameObject {
    name: string = "anon_component_manager"
    contents: (Component | ComponentManager)[] = []
    constructor(name?: string, contents?: (Component | ComponentManager)[]) {
        super();
        if (name) this.name = name;
        if (contents) this.contents = contents;
    }

    get_component(component_name: string): { manager: ComponentManager, component: GameObject } | undefined {
        for (const child_component of this.contents) {
            if (child_component.name === component_name) {
                return {
                    manager: this,
                    component: child_component
                }
            }
        }

        //if no matches, search recursively
        for (const child_component of this.contents) {
            const matched_component = child_component.get_component(component_name)
            if (matched_component) return matched_component
        }

        return undefined
    }
}