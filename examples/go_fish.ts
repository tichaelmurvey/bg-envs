import GameEnv from "../src/core/game_env"
import Player from "../src/core/player"
import { Hand } from "../src/prefabs/hand"
import CardGameDeckSetup, { BasicCardDeck, BasicCardDiscard } from "../src/prefabs/basic_cardgame_deck"
import { Phase } from "../src/core/phase"
import { Action } from "../src/core/action/action"


class GoFishPlayer extends Player {
    hand: Hand = new Hand()
}

const [deck, discard] = CardGameDeckSetup();
const go_fish_env = new GameEnv([], [], GoFishPlayer, { deck, discard })
const go_fish_game1 = go_fish_env.new_game