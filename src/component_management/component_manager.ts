import Component from "../components/component"
import { GameObject } from "../types";
import { Deck } from "./deck"

export class ComponentManager {
    name: string = "anon_component_manager"
    contents: GameObject[] = []
    constructor(name?: string, contents?: GameObject[]) {
        if (name) this.name = name;
        if (contents) this.contents = contents;
    }
}