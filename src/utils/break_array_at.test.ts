import { expect, test } from 'vitest'
import { break_at } from './break_array_at'

test('Splits arrays at delimiter', () => {
    expect(break_at("and", ["do", "something", "and", "something", "else"])).toEqual([["do", "something"], ["something", "else"]])
    expect(break_at("and", ["do", "something", "and", "something", "else", "and", "this"])).toEqual([["do", "something"], ["something", "else"], ["this"]])
    expect(break_at("and", ["do", "one", "thing"])).toEqual([["do", "one", "thing"]])
})