import { expect, test } from 'vitest'
import parse_action, { parse_atomic_action } from './parse_action'
import GameEnv, { GameInstance } from '../../core/game_env'
import { CardGameBaseEnv } from '../../prefabs/game_bases/card_game_base'
import { PCardSuit, PCardRank } from '../../types'

/*
EXAMPLE ACTIONS
set HEARTS_BROKEN to true
move SELECTION from ME to LEFT_PLAYER
play_on_table all RANK from ME
move all SUIT from TARGET_PLAYER to ME then new_turn for ME
set RANK of all SUIT of ME to ACE
*/


test("Parse atomic action function return", () => {
    expect(typeof parse_atomic_action("set HEARTS_BROKEN to true".split(" "), {
        custom_vars: {
            HEARTS_BROKEN: false
        },
        custom_consts: {}
    })).toBe("function")

    expect(typeof parse_atomic_action("set all SUIT of ME to ACE".split(" "), {
        input_params: ["SUIT"],
        custom_vars: {},
        custom_consts: Object.assign({}, PCardRank)
    })).toBe("function")
})

test("set all SUIT of ME to ACE", () => {
    const test_game = new CardGameBaseEnv({})
    const test_game_instance = test_game.new_game()
    const set_ace = parse_atomic_action("set RANK of all SUIT of ME to ACE".split(" "), {
        custom_vars: {},
        custom_consts: test_game_instance.game_env.custom_consts
    })

    set_ace(test_game_instance)
})

function new_game() {
    const TestGame = new GameEnv(
        {
            custom_vars: {
                HEARTS_BROKEN: false
            }
        }
    )

    const test_game_instance = TestGame.new_game()
    return test_game_instance
}

test("Modify custom var on game instance", () => {

    const test_game_instance = new_game()
    const do_move = parse_atomic_action("set HEARTS_BROKEN to true".split(" "), {
        custom_vars: {
            HEARTS_BROKEN: false
        },
        custom_consts: {}
    })
    do_move(test_game_instance)

    expect(test_game_instance.custom_vars["HEARTS_BROKEN"]).toEqual(true)

    const set_hearts_false = parse_atomic_action("set HEARTS_BROKEN to false".split(" "), {
        custom_vars: {
            HEARTS_BROKEN: false
        },
        custom_consts: {}
    })

    set_hearts_false(test_game_instance)
    expect(test_game_instance.custom_vars["HEARTS_BROKEN"]).toEqual(false)

    const set_hearts_number = parse_atomic_action("set HEARTS_BROKEN to 5".split(" "), {
        custom_vars: {
            HEARTS_BROKEN: false
        },
        custom_consts: {}
    })

    set_hearts_number(test_game_instance)
    expect(test_game_instance.custom_vars["HEARTS_BROKEN"]).toEqual(5)
})