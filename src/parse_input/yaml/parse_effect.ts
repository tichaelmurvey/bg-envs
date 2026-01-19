import { Effect } from "../../core/effect";
import { EffectRule } from "../../types";
import parse_action from "./parse_action";
import { parse_conditional } from "./parse_conditional";
import parse_input from "./parse_input";
import { EnvObjectRefString, ExecutableFromYAML, YAMLPseudoSymbol } from "./yaml_types";
import { is_only_component_names, only_upper_case, validate_only_component_names } from "./yaml_utils/validators";

export default function parse_effect(
    args: EffectRule
): Effect {
    //handle case with pure action
    if (typeof args === "string") {
        return new Effect("anon", () => parse_action(args))
    }

    let input_vars: unknown[] = []

    //handle any required input
    if (args.input) {
        input_vars = parse_input(args.input)
    }

    let condition_checker = () => true
    if (args.check) {
        condition_checker = parse_conditional(args.check)
    }


    //create effect_function with input params as argument names
    const effect_function = (...args: typeof input_vars) => {
        //define condition check

    }

}