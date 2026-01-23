import PlayingCard from "../prefabs/components/playing_card"
import { PCardSuit, PCardRank } from "../types"
import rng, { rng_range } from "../utils/rng"

const BASIC_52 = Object.values(PCardSuit).filter(val => typeof val === 'number').flatMap(suit =>
    Object.values(PCardRank).filter(val => typeof val === 'number').map(val => new PlayingCard(suit, val))
)

export default BASIC_52