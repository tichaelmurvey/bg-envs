import { EnvObjectRefString, ExecutableFromYAML, SymbolFromYAML } from "./yaml_types";
import { is_only_component_names, only_upper_case } from "./yaml_utils/validators";

export default function parse_effect(
    input: ExecutableFromYAML,
    check_condition: ExecutableFromYAML,
    if_check_pass: ExecutableFromYAML,
    if_check_fail: ExecutableFromYAML,
    env_component_vars: EnvObjectRefString[] = []
) {
    const input_params = only_upper_case(input);
    //check all input_params are valid environment component names
    if (!is_only_component_names(input_params, env_component_vars)) {
        console.log(input_params)
        throw new Error("Attempted to define custom effect with non-component name.")
    }

    //create effect_function with input params as argument names
    const effect_function = (args: unknown) => {
        //define condition check

    }

}