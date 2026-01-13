import GameEnv, { GameEnvParams } from "../../../core/game_env";
import Player from "../../../core/player";
import { Hand } from "../../component_managers/hand";

class CardGamePlayer extends Player {
    hand: Hand = new Hand()
}

class CardGameBase extends GameEnv {
    player = CardGamePlayer
    constructor(config: GameEnvParams) {
        super(config);
        this.actions = [...this.actions, 'deal'];
    }
}

