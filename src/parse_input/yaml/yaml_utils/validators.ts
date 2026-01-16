import { EnvObjectRefString, ExecutableFromYAML, PSEUDO_CONDITIONAL_LITERALS, PSEUDO_METHOD_EXEC_LITERALS, PseudoConditionalString, PseudoMethodExecString } from "../yaml_types";

export function only_upper_case(exec_string: string[]) {
    return exec_string.filter(word => /[a-z]/i.test(word) && word.toUpperCase() === word)
}
export function only_lower_case(exec_string: string[]) {
    return exec_string.filter(word => /[a-z]/i.test(word) && word.toUpperCase() !== word)
}

// export function validate_only_conditional_pseudos(arr: string[]): arr is PseudoConditionalString[] {

// }

export function validate_only_method_names(arr: string[]): arr is PseudoMethodExecString[] {
    const validLiterals: string[] = [...PSEUDO_METHOD_EXEC_LITERALS]

    return arr.every(str => {
        // Check if it's one of the literal strings
        if (validLiterals.includes(str)) {
            return true;
        }

        // Check if it's a valid number string
        // This matches the template literal `${number}`
        const num = Number(str);
        return !isNaN(num) && str === String(num);
    });
}

export function validate_only_conditional_pseudos(arr: string[]): arr is PseudoConditionalString[] {
    const validLiterals: string[] = [...PSEUDO_CONDITIONAL_LITERALS]

    return arr.every(str => {
        // Check if it's one of the literal strings
        if (validLiterals.includes(str)) {
            return true;
        }

        // Check if it's a valid number string
        // This matches the template literal `${number}`
        const num = Number(str);
        return !isNaN(num) && str === String(num);
    });
}

export function validate_only_component_names(name_list: string[], env_comp_names: EnvObjectRefString[]): name_list is EnvObjectRefString[] {
    const result = is_only_component_names(name_list, env_comp_names)
    if (!result) {
        console.log(name_list)
        throw new Error("Attempted to define custom effect with non-component name.")
    }
    return result
}

export function is_only_component_names(name_list: string[], env_comp_names: EnvObjectRefString[]) {
    return name_list.every(val => is_comp_name(val, env_comp_names))
}

export function is_comp_name(val: string, env_comp_names: EnvObjectRefString[]): val is EnvObjectRefString {
    return env_comp_names.includes(val as EnvObjectRefString)
}