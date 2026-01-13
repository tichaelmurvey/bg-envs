import { expect, test } from 'vitest'
import { parse_conditional } from './parse_conditional'
import { ConditionalFromYAML } from './yaml_types'
import { GameInstance } from '../../core/game_env'

const sample1 = "TARGET_PLAYER has SUIT"
const sample2 = "ME has SUIT"
const sample3 = "CURRENT_ROUND is ODD"
const sample4 = "CARD_PLAYED has SUIT of HEARTS"


test(sample1, () => {
    expect(parse_conditional(sample1.split(" ") as ConditionalFromYAML)).toEqual
})


function sample1_expected(game_instance: GameInstance, target_player: Number, suit: Number) {

}
