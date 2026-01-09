import GameEnv from "../src/core/game_env"
import Player from "../src/core/player"
import { Hand } from "../src/prefabs/hand"
import CardGameDeckSetup, { BasicCardDeck, BasicCardDiscard } from "../src/prefabs/basic_cardgame_deck"

class GoFish extends GameEnv {
    deck: BasicCardDeck
    discard: BasicCardDiscard
    player: typeof GoFishPlayer
    constructor() {
        super();
        [this.deck, this.discard] = CardGameDeckSetup();
        this.player = GoFishPlayer
    }
}

class GoFishPlayer extends Player {
    hand: Hand = new Hand()
}