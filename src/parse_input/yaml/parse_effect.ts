import { Effect } from "../../core/effect";
import { Check, EffectRule } from "../../types";
import parse_action from "./parse_action";
import { parse_conditional } from "./parse_conditional";
import parse_input from "./parse_input";
import { CustomVars, EnvObjectRefString, ExecutableFromYAML, YAMLPseudoSymbol } from "./yaml_types";
import { is_only_component_names, only_upper_case, validate_only_component_names } from "./yaml_utils/validators";

export default function parse_effect(
    rule: EffectRule,
    custom_vars: CustomVars
): Effect {

    //handle case with pure action
    if (typeof rule === "string") {
        return new Effect("anon", () => parse_action(rule, { custom_vars }))
    }

    let input_vars: unknown[] = []

    //handle any required input
    if (rule.input) {
        input_vars = parse_input(rule.input)
    }

    let condition_checker: Check
    if (rule.check) {
        condition_checker = parse_conditional(rule.check)
    }


    //create effect_function with input params as argument names
    const effect_function = (...args: typeof input_vars) => {
        //define condition check

    }

}