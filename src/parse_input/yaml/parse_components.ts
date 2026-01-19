import { ComponentRule, GameObject } from "../../types";
import Component from "../../components/component";
import { COMPONENT_MANAGERS } from "../../prefabs/component_managers/component_managers_list";

export default function parse_components(component_def: ComponentRule): GameObject[] {
    console.log("constructing new component")

    //Check if component container or component
    if (component_def.contents) {
        console.log("comopnent is a container")
        if (!COMPONENT_MANAGERS[component_def.type]) {
            throw new Error("Component manager type not recognised: " + component_def.type)
        }
        const Manager = COMPONENT_MANAGERS[component_def.type]
        const contents = component_def.contents.flatMap(parse_components)
        return [new Manager(
            component_def.name,
            contents
        )]
    }

    //handle simple component case
    console.log("component is not a container")
    //Handle multiple colors
    if (component_def.colors) {
        console.log("component needs multiple colors")
        const components: Component[] = []
        for (const current_color of component_def.colors) {
            console.log("creating components for color " + current_color)
            components.push(...define_component_batch({
                color: current_color,
                ...component_def
            }))
        }
        return components;
    }
    console.log("component does not have multiple colors")
    //handle single/no colors
    return define_component_batch(component_def)
}

function define_component_batch(component_def: ComponentRule) {
    console.log("defining component batch")
    const components: Component[] = []
    const number = component_def.number || 1
    console.log("Creating " + number + " instances")
    for (let i = 0; i < number; i++) {
        components.push(new Component(
            {
                name: component_def.name,
                type: component_def.type,
                color: component_def.color
            }
        ))
    }
    console.log("created components! " + components)
    return components
}