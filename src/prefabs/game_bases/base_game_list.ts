import GameEnv from "../../core/game_env";
import { Phase } from "../../core/phase";
import { CardGameBaseEnv } from "./card_game_base";

export const BASE_GAMES: Record<string, {
    game: typeof GameEnv
    prefab_phases?: Record<string, typeof Phase>
}> = {
    card_game: { game: CardGameBaseEnv },
    card_game_tricks: { game: CardGameBaseEnv }
}