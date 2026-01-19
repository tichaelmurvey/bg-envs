import { ComponentRule, ComponentTypes } from "../types";

class Component {
    name: string | undefined;
    type: ComponentTypes
    color: string | undefined
    constructor(
        params: {
            name: string,
            type: ComponentTypes,
            color?: string
        }
    ) {
        this.name = params.name;
        this.type = params.type;
        this.color = params.color;
    }
}

export default Component