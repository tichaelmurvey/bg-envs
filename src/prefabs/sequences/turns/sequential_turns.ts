import { Phase } from "../../../core/phase";
import Player from "../../../core/player";
import next_item from "../../../utils/next_array_item";
import { PlayerMovePhase } from "../player_action_phase";

export class SequentialTurns extends PlayerMovePhase {
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

export function is_sequential_turns(phase: Phase): phase is SequentialTurns {
    return phase instanceof SequentialTurns
}