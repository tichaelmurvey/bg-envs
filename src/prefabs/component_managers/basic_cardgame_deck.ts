import { Deck } from "../../component_management/deck"
import Component from "../../components/component";
import Player from "../../core/player";
import BASIC_52 from "../../data/basic_52";
import { Hand } from "./hand";
import PlayingCard from "../components/playing_card";

class CardHand extends Hand {
    items: PlayingCard[] = []
}

interface CardHandPlayer extends Player {
    hand: CardHand
}

export class BasicCardDeck extends Deck {

    refill: Deck

    constructor(
        name: string = "deck",
        items_init: Component[] = [],
        refill?: Deck
    ) {
        super(name, items_init)
        this.refill = refill || new BasicCardDiscard(`${name}_discard`)
    }

    handle_empty() {
        if (this.refill.contents.length == 0) return;
        this.contents = [...this.refill.contents];
        this.refill.contents.length = 0;
        this.shuffle()
    }

    deal(players: Array<CardHandPlayer>) {
        for (const player of players) {
            if (player.hand) {
                player.hand.add(this.draw())
            }
        }
    }
}

export class BasicCardDiscard extends Deck {
    constructor(
        name: string = "discard",
        items_init: Component[] = [],
    ) {
        super(name, items_init)
    }
}

export default function CardGameDeckSetup(basic_52: boolean = true): [BasicCardDeck, BasicCardDiscard] {
    const discard = new BasicCardDiscard()
    const deck = new BasicCardDeck(undefined, basic_52 ? BASIC_52 : undefined)
    return [deck, discard]
}