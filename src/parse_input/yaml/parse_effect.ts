import { ExecutableFromYAML } from "./yaml_types";
import { only_component_names } from "./yaml_utils";

export default function parse_effect(
    input: ExecutableFromYAML,
    check_condition: ExecutableFromYAML,
    if_check_pass: ExecutableFromYAML,
    if_check_fail: ExecutableFromYAML
) {
    const input_params = only_component_names(input);
}