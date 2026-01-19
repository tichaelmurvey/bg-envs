import { default_effect, Effect } from "../effect"
import { Check } from "../../types"
import { PlayerChoice } from "./player_choice"

export class PlayerMove {
    name: string = "base_player_move"
    choose?: PlayerChoice
    condition?: Check
    effect = default_effect
}
