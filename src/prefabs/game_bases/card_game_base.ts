import { Deck } from "../../component_management/deck";
import GameEnv, { GameEnvParams } from "../../core/game_env";
import Player from "../../core/player";
import { PCardSuit, PCardRank } from "../../data/basic_52";
import CardGameDeckSetup, { BasicCardDeck, BasicCardDiscard } from "../component_managers/basic_cardgame_deck";
import { Hand } from "../component_managers/hand";
import { SequentialTurns } from "../sequences/turns/sequential_turns";

class CardGamePlayer extends Player {
    contents = [new Hand()]
}

export class CardGameBaseEnv extends GameEnv {
    public player = CardGamePlayer
    public deck: BasicCardDeck
    public discard: BasicCardDiscard
    constructor(config: GameEnvParams) {
        super(config);
        this.custom_enums["SUIT"] = PCardSuit;
        this.custom_enums["RANK"] = PCardRank;
        [this.deck, this.discard] = CardGameDeckSetup()
    }
}

const x = typeof PCardRank