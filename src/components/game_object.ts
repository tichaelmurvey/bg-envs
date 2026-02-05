import { ComponentManager } from "../component_management/component_manager";

class GameObject {
    name: string = "anon_gameobject";
    identity_attributes: Record<string, string | number | boolean> = {}
    get_component(component_name: string): { manager: ComponentManager, component: GameObject } | undefined {
        throw new Error("Attempted to call get_component on base GameObject")
    }
}

export default GameObject