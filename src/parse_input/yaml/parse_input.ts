import { validate_only_component_names } from "./yaml_utils/validators";

export default function parse_input(input_ref: string): unknown[] {
    //check all input_params are valid environment component names
    if (!validate_only_component_names(input_params, env_component_vars)) return;
    input_params
}