import { CardGameBaseEnv } from "./prefabs/game_bases/card_game_base";

const game = new CardGameBaseEnv({})
const game_instance = game.new_game()
console.log(game_instance.game_env.custom_consts)
console.log(game_instance.game_env.custom_consts["ACE"])