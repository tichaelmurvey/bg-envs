import { EnvObjectRefString, ExecutableFromYAML, YAMLPseudoSymbol } from "./yaml_types";
import { is_only_component_names, only_upper_case, validate_only_component_names } from "./yaml_utils/validators";

export default function parse_effect(
    input: ExecutableFromYAML,
    check_condition: ExecutableFromYAML,
    if_check_pass: ExecutableFromYAML,
    if_check_fail: ExecutableFromYAML,
    env_component_vars: EnvObjectRefString[] = []
) {
    const input_params = only_upper_case(input);

    //check all input_params are valid environment component names
    if (!validate_only_component_names(input_params, env_component_vars)) return;
    input_params

    //create effect_function with input params as argument names
    const effect_function = (args: unknown) => {
        //define condition check

    }

}