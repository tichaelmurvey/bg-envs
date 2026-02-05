import { ComponentRule, ComponentTypes } from "../types";
import GameObject from "./game_object";

class Component extends GameObject {
    name: string = "anon_component";
    type: ComponentTypes
    color: string | undefined
    constructor(
        params: {
            name: string,
            type: ComponentTypes,
            color?: string
        }
    ) {
        super()
        this.name = params.name;
        this.type = params.type;
        this.color = params.color;
    }
}

export default Component