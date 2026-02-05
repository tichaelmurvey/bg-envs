import GameEnv from "../src/core/game_env"
import Player from "../src/core/player"
import { GameStart, Phase } from "../src/core/phase"
import { Hand } from "../src/prefabs/component_managers/hand"
import { CardGameBaseEnv } from "../src/prefabs/game_bases/card_game_base"
import { SequentialTurns } from "../src/prefabs/sequences/turns/sequential_turns"

class GoFishPlayer extends Player {
    hand: Hand = new Hand()
}

const go_fish_env = new CardGameBaseEnv({
    phases: [GameStart, SequentialTurns]
})
const go_fish_game = go_fish_env.new_game()
