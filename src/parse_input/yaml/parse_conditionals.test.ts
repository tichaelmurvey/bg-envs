import { expect, test } from 'vitest'
import { parse_conditional } from './parse_conditional'
import { ConditionalFromYAML } from './yaml_types'
import { CardGameBaseEnv } from '../../prefabs/game_bases/card_game_base'
import { GameStart } from '../../core/phase'
import { SequentialTurns } from '../../prefabs/sequences/turns/sequential_turns'

/*
Example conditionals:
SOME_PLAYER_INPUT is 3
ME has HEARTS
ME has EIGHT of DIAMONDS
ME has CARD
ME has SUIT
CARD_PLAYED is SUIT
CURRENT_ROUND is ODD
CURRENT_ROUND is EVEN and CARD_PLAYED is RANK
TARGET_PLAYER has SUIT
ME has 4 of any RANK
CARD_PLAYED is HEARTS
HEARTS_BROKEN is false
CURRENT_ROUND is 1 or 2
CURRENT_ROUND is ODD and CARD_PLAYED is SUIT and CARD_PLAYED is RANK
ME has 3 of SUIT and ME has ODD CARD
ME has less than 4 CARDS
any PLAYER has more than 3 POINTS
no PLAYER has GOLD or SILVER
*/


const str1 = "CURRENT_ROUND is ODD"
const test_game_env = new CardGameBaseEnv({
    phases: [GameStart, SequentialTurns]
})

const test_game_instance = test_game_env.new_game()

test(`${str1} returns function`, () => {
    const conditional = parse_conditional(str1.split(" ") as ConditionalFromYAML, {}, { CURRENT_ROUND: 0 }, {})
    expect(typeof conditional).toBe("function");
})

test(`${str1} function evaluates to boolean`, () => {
    const conditional = parse_conditional(str1.split(" ") as ConditionalFromYAML, {}, { CURRENT_ROUND: 0 }, {});
    const evaluation_result = conditional(test_game_instance)
    expect(typeof evaluation_result).toBe("boolean");
})

const str2 = "CURRENT_ROUND is ODD"
test(`${str2} function evaluates to False`, () => {
    const conditional = parse_conditional(str2.split(" ") as ConditionalFromYAML, {}, { CURRENT_ROUND: 0 }, {});
    const evaluation_result = conditional(test_game_instance)
    expect(evaluation_result).toBe(false);
})


test(`${str2} function evaluates to True when CURRENT_ROUND is 3`, () => {
    const test_game_instance_2 = test_game_env.new_game()
    test_game_instance_2.custom_vars["CURRENT_ROUND"] = 3
    const conditional = parse_conditional(str2.split(" ") as ConditionalFromYAML, {}, { CURRENT_ROUND: 0 }, {});
    const evaluation_result = conditional(test_game_instance_2)
    expect(evaluation_result).toBe(true);
})

const str3 = "SOME_PLAYER_INPUT is 3"
test(`${str3} resolves to function`, () => {
    const conditional = parse_conditional(str3.split(" ") as ConditionalFromYAML, {}, {}, {}, ["SOME_PLAYER_INPUT"])
    expect(typeof conditional).toBe("function")
})

test(`${str3} evaluates correctly`, () => {
    const is_three = parse_conditional(str3.split(" ") as ConditionalFromYAML, {}, {}, {}, ["SOME_PLAYER_INPUT"])
    expect(is_three(test_game_instance, [2])).toBe(false)
    expect(is_three(test_game_instance, [3])).toBe(true)
})