import GameEnv from "../../core/game_env";
import { CardGameBaseEnv } from "./card_game_base";

export const BASE_GAMES: Record<string, typeof GameEnv> = {
    card_game: CardGameBaseEnv,
    card_game_tricks: CardGameBaseEnv
}