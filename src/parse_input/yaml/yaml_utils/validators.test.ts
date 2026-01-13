import { EnvObjectRefString } from "../yaml_types"
import { is_only_component_names, only_upper_case } from "./validators"
import { expect, test } from 'vitest'

test('returns only uppercase', () => {
    expect(only_upper_case(["WORD", "word", "Word", "W"])).toEqual(["WORD", "W"])
    expect(only_upper_case(["word", "Word"])).toEqual([])
    expect(only_upper_case(["_WORD"])).toEqual(["_WORD"])
})


const sample_comp_name = ["CARD", "SUIT", "RANK", "ME", "TARGET_PLAYER"] as EnvObjectRefString[]
test('Checks if only component names', () => {
    expect(is_only_component_names(["WORD", "word", "Word", "W"], sample_comp_name)).toBe(false)
    expect(is_only_component_names(["CARD", "SUIT"], sample_comp_name)).toBe(true)
    expect(is_only_component_names(["CARD", "Suit"], sample_comp_name)).toBe(false)
})