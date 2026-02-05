import PlayingCard from "../prefabs/components/playing_card"
import rng, { rng_range } from "../utils/rng"

export enum PCardSuit {
    HEART = 0,
    HEARTS = 0,
    DIAMOND = 1,
    DIAMONDS = 1,
    SPADE = 2,
    SPADES = 2,
    CLUB = 3,
    CLUBS = 3
}

export enum PCardRank {
    ACE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING
}

const BASIC_52 = Object.values(PCardSuit).filter(val => typeof val === 'number').flatMap(suit =>
    Object.values(PCardRank).filter(val => typeof val === 'number').map(val => new PlayingCard(suit, val))
)

export default BASIC_52