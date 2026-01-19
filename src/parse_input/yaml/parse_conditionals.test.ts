import { expect, test } from 'vitest'
import { parse_conditional } from './parse_conditional'
import { comp_glossary } from './component_glossary'
import { ConditionalFromYAML } from './yaml_types'

/*
Example conditionals:
ME has SUIT
CARD_PLAYED is SUIT
CURRENT_ROUND is EVEN and CARD_PLAYED is RANK
TARGET_PLAYER has SUIT
ME has 4 of any RANK
CURRENT_ROUND is ODD
CARD_PLAYED has SUIT of HEARTS
HEARTS_BROKEN is false
CURRENT_ROUND is 1 or 2
CURRENT_ROUND is ODD and CARD_PLAYED is SUIT and CARD_PLAYED is RANK
ME has 3 of SUIT and ME has ODD CARD
ME has less than 4 CARDS
any PLAYER has more than 3 POINTS
no PLAYER has any GOLD or SILVER
*/

const str1 = "ME has SUIT"
test(str1, () => {
    expect(typeof parse_conditional(str1.split(" ") as ConditionalFromYAML, comp_glossary)).toBe('function')
})