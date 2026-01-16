import Component from "../../components/component";
import { break_at } from "../../utils/break_array_at";
import { getKeys } from "../../utils/type_utils";
import { ComponentGlossary, ConditionalFromYAML, ConditionalWithComponents, EnvMethodRefString, EnvObjectRefString, Glossary, PseudoConditionalString } from "./yaml_types";
import { is_comp_name, only_lower_case, only_upper_case, validate_only_component_names, validate_only_conditional_pseudos } from "./yaml_utils/validators";


/*
Example conditionals:
ME has SUIT
TARGET_PLAYER has SUIT
ME has 4 of any RANK
CURRENT_ROUND is ODD
CARD_PLAYED has SUIT of HEARTS
HEARTS_BROKEN is false
CURRENT_ROUND is 1 or 2
CURRENT_ROUND is EVEN and CARD_PLAYED is RANK
CURRENT_ROUND is ODD and CARD_PLAYED is SUIT and CARD_PLAYED is RANK
ME has 3 of SUIT and ME has ODD
ME has less than 4 CARDS
any PLAYER has more than 3 POINTS
no PLAYER has any GOLD or SILVER
*/

type Check = (...args: any[]) => boolean
export function parse_conditional(cond_str_list: ConditionalFromYAML, comp_glossary: ComponentGlossary): Check {

    //Validate inputs
    const comp_refs = only_upper_case(cond_str_list) as EnvObjectRefString[];
    if (!validate_only_component_names(comp_refs, Object.keys(comp_glossary) as EnvObjectRefString[])) throw new Error()

    const conditional_pseudos = only_lower_case(cond_str_list) as PseudoConditionalString[];
    if (!validate_only_conditional_pseudos(conditional_pseudos)) throw new Error()

    //look up components
    const cond_str_obj_real = cond_str_list.map(token => {
        if (is_comp_name(token, getKeys(comp_glossary))) {
            return comp_glossary[token]
        }
        return token
    })

    //Split ands
    if (cond_str_obj_real.includes("and")) {
        const condition_lists = break_at("and", cond_str_obj_real)
        const checkers = condition_lists.map(cond => parse_atomic_conditional(cond, comp_glossary))
        return evaluate_checks_all(checkers)
    }
}

function parse_atomic_conditional(cond_str_list: ConditionalWithComponents, comp_glossary: ComponentGlossary): Check {
    //atomic checks around comparison operators "is", "has"
    const operator = confirm_single_condition(cond_str_list);
    const operator_index = cond_str_list.indexOf(operator);
    const [subj, obj] = break_at(operator, cond_str_list);

    //has
    if (operator === "has") {

    }

    //is

}

function confirm_single_condition(cond_str_list: unknown[]) {
    const operators = cond_str_list.filter(token => token === "has" || token === "is")
    if (operators.length !== 1) {
        throw new Error("Not a single conditional: " + cond_str_list)
    }
    return operators[0]
}

function evaluate_checks_all(funcs: Check[]) {
    return (...args: any[]) => {
        for (const check of funcs) {
            if (!check(...args)) {
                return false
            }
        }
        return true
    }
}

function evaluate_checks_any(funcs: Check[]) {
    return (...args: any[]) => {
        for (const check of funcs) {
            if (check(...args)) {
                return true
            }
        }
        return false
    }
}

function parse_has(cond_str_list: ConditionalFromYAML) {

}