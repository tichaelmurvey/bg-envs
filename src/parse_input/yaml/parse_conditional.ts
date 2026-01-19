import Component from "../../components/component";
import { GameInstance } from "../../core/game_env";
import { break_at } from "../../utils/break_array_at";
import { get_keys } from "../../utils/type_utils";
import { ComponentGlossary, ComponentQuery, ConditionalFromYAML, ConditionalWithComponents, EnvMethodRefString, EnvObjectRefString, Glossary, PseudoConditionalString } from "./yaml_types";
import { is_comp_name, only_lower_case, only_upper_case, validate_only_component_names, validate_only_conditional_pseudos } from "./yaml_utils/validators";


/*
Example conditionals:
ME has SUIT
CARD_PLAYED is SUIT
CURRENT_ROUND is EVEN and CARD_PLAYED is RANK
TARGET_PLAYER has SUIT
ME has 4 of any RANK
CURRENT_ROUND is ODD
CARD_PLAYED has SUIT of HEARTS
HEARTS_BROKEN is false
CURRENT_ROUND is 1 or 2
CURRENT_ROUND is ODD and CARD_PLAYED is SUIT and CARD_PLAYED is RANK
ME has 3 of SUIT and ME has ODD CARD
ME has less than 4 CARDS
any PLAYER has more than 3 POINTS
no PLAYER has GOLD or SILVER
*/

type Check = (gs: GameInstance, ...args: any[]) => boolean

export function parse_conditional(cond_str_list: ConditionalFromYAML, comp_glossary: ComponentGlossary, input_vars: string[]): Check {

    //Validate inputs
    const comp_refs = only_upper_case(cond_str_list) as EnvObjectRefString[];
    if (!validate_only_component_names(comp_refs, Object.keys(comp_glossary) as EnvObjectRefString[])) throw new Error()

    const conditional_pseudos = only_lower_case(cond_str_list) as PseudoConditionalString[];
    if (!validate_only_conditional_pseudos(conditional_pseudos)) throw new Error()

    //Split ands
    if (cond_str_list.includes("and")) {
        const condition_lists = break_at("and", cond_str_list)
        const checkers = condition_lists.map(cond => parse_atomic_conditional(cond, comp_glossary))
        return evaluate_checks_all(checkers)
    }
    return parse_atomic_conditional(cond_str_list, comp_glossary)
}

function parse_atomic_conditional(cond_str_list: ConditionalFromYAML, comp_glossary: ComponentGlossary): Check {

    //atomic checks around comparison operators "is", "has"
    const glossary_component_names = get_keys(comp_glossary)
    const operator = confirm_single_condition(cond_str_list);
    const [subj, obj] = break_at(operator, cond_str_list);

    const condition_operand_ref = subj.slice(-1)[0]
    if (!(is_comp_name(condition_operand_ref, glossary_component_names))) throw new Error("Token before operator is not in component glossary")

    let condition_operand = comp_glossary[condition_operand_ref]

    let comparison_function

    //Parse obj



    const obj_array = break_at("or", obj)
    for (const obj of obj_array) {
        const obj_noun = obj.slice(-1)
        //check for literals
        if ()

    }


    // if (!(condition_operand instanceof Component)) throw new Error("operand " + condition_operand + " is not component")
    return (gs: GameInstance, ...args: unknown[]) => {
        return true
    }
}

function confirm_single_condition(cond_str_list: unknown[]) {
    const operators = cond_str_list.filter(token => token === "has" || token === "is")
    if (operators.length !== 1) {
        throw new Error("Not a single conditional: " + cond_str_list)
    }
    return operators[0]
}

function evaluate_checks_all(funcs: Check[]) {
    return (gs: GameInstance, ...args: any[]) => {
        for (const check of funcs) {
            if (!check(gs, ...args)) {
                return false
            }
        }
        return true
    }
}

function parse_has(cond_str_list: ConditionalFromYAML) {

}
