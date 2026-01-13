import { Phase } from "../../../core/phase";
import Player from "../../../core/player";
import next_item from "../../../utils/next_array_item";

export class SequentialTurns extends Phase {
    public turn_order: "circle" | "custom" = "circle"
    public players: Player[] = []
    public current_player: Player | undefined

    set_player(player_idx: number) {
        this.current_player = this.players[player_idx]
    }

    next_player() {
        this.current_player = next_item(this.players, this.current_player)
    }
}