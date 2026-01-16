import { GameInstance } from "../../core/game_env";
import { SequentialTurns } from "../../prefabs/sequences/turns/sequential_turns";
import { ComponentGlossary, ComponentQuery, EnvObjectRefString } from "./yaml_types";

export const comp_glossary: ComponentGlossary = {
    ["ME" as EnvObjectRefString]: (gs: GameInstance) => {
        if (!(gs.current_phase_root instanceof SequentialTurns) || gs.current_phase_root.current_player === undefined) {
            throw new Error("Tried to find ME on phase without current_player")
        }
        return gs.current_phase_root.current_player
    }
}