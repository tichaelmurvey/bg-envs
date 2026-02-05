import Component from "../../components/component";
import { PCardRank, PCardSuit } from "../../data/basic_52";

export default class PlayingCard extends Component {
    suit: PCardSuit
    rank: PCardRank
    readable: string

    constructor(suit: PCardSuit, rank: PCardRank) {
        super({
            name: `${rank} of ${suit}`,
            type: "card"
        })
        this.suit = suit
        this.rank = rank
        this.identity_attributes = {
            suit, rank
        }
        this.readable = `${PCardRank[this.rank]} of ${PCardSuit[this.suit]}`
    }
}