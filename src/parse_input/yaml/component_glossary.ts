import Component from "../../components/component";
import { GameInstance } from "../../core/game_env";
import { Phase } from "../../core/phase";
import Player from "../../core/player";
import { CardGameBaseEnv } from "../../prefabs/game_bases/card_game_base";
import { SequentialTurns } from "../../prefabs/sequences/turns/sequential_turns";
import { ComponentGlossary, ComponentQuery, EnvObjectRefString } from "./yaml_types";

type k = EnvObjectRefString
export const comp_glossary: ComponentGlossary = {
    ["ME" as k]: (gs: GameInstance) => {
        if (!(gs.current_phase instanceof SequentialTurns) || gs.current_phase.current_player === undefined) {
            throw new Error("Tried to find ME on phase without current_player")
        }
        return gs.current_phase.current_player
    },
    ["PLAYER" as k]: (gs: GameInstance) => {
        return gs.players
    },
    ["TARGET_PLAYER" as k]: (gs: GameInstance, target_index: number) => {
        return gs.players[target_index]
    },
    ["CURRENT_ROUND" as k]: (gs: GameInstance): Phase => {
        return gs.get_active_phase()
    },
}

