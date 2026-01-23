import Component from "../../components/component";
import { PCardSuit, PCardRank } from "../../types";

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
        this.readable = `${PCardRank[this.rank]} of ${PCardSuit[this.suit]}`
    }
}