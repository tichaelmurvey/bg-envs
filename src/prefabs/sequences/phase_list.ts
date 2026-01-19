import { Phase } from "../../core/phase";
import { SequentialTurns } from "./turns/sequential_turns";

export const PHASE_PREFABS: Record<string, typeof Phase> = {
    take_turns: SequentialTurns
}