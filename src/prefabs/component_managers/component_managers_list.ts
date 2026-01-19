import { ComponentManager } from "../../component_management/component_manager";
import { Deck } from "../../component_management/deck";

export const COMPONENT_MANAGERS: Record<string, typeof ComponentManager> = {
    deck: Deck,
}
