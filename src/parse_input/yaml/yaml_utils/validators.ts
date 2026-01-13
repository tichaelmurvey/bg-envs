import { EnvObjectRefString, ExecutableFromYAML } from "../yaml_types";

export function only_upper_case(exec_string: string[]) {
    return exec_string.filter(word => /[a-z]/i.test(word) && word.toUpperCase() === word)
}

export function is_only_component_names(name_list: string[], env_comp_names: EnvObjectRefString[]) {
    return name_list.every(val => is_comp_name(val, env_comp_names))
}

export function is_comp_name(val: string, env_comp_names: EnvObjectRefString[]): val is EnvObjectRefString {
    return env_comp_names.includes(val as EnvObjectRefString)
}