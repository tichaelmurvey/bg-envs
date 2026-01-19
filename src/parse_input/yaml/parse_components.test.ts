import { expect, test } from 'vitest'
import { yamlFileToObj } from './yaml_to_obj'
import { Rulebook } from '../../types'
import parse_components from './parse_components'

const rulebook = yamlFileToObj<Rulebook>("/home/deck/Projects/bg-envs/examples/example_components.yaml")

test("Parse component", () => {
    expect(parse_components(rulebook.custom_components[0])).toBe('function')
})