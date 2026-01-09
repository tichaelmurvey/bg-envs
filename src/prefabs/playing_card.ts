import Component from "../components/component";
import { PCardSuit, PCardVal } from "../types";

export default class PlayingCard extends Component {
    suit: PCardSuit
    val: PCardVal
    readable: string

    constructor(suit: PCardSuit, val: PCardVal) {
        super()
        this.suit = suit
        this.val = val
        this.readable = `${PCardVal[this.val]} of ${PCardSuit[this.suit]}`
    }
}