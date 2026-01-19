import parse_components from "./parse_input/yaml/parse_components";
import { yamlFileToObj } from "./parse_input/yaml/yaml_to_obj";
import { Rulebook } from "./types";

const rulebook = yamlFileToObj<Rulebook>("/home/deck/Projects/bg-envs/examples/example_components.yaml")
console.log(rulebook.custom_components[1])
const component = parse_components(rulebook.custom_components[1])
console.log(component)