import Component from "../../components/component";
import GameObject from "../../components/game_object";
import { GameInstance } from "../../core/game_env";
import { Check } from "../../types";
import { break_at } from "../../utils/break_array_at";
import { get_keys } from "../../utils/type_utils";
import { GameObjectLookups, GameObjQuery, ConditionalFromYAML, ConditionalWithComponents, EnvMethodRefString, EnvObjectRefString, PseudoConditionalString, ComponentGlossary, CustomVars, CustomEnums } from "./yaml_types";
import { convert_literal } from "./yaml_utils/convert_literals";
import { predef_evaluators } from "./yaml_utils/predef_evaluators";
import { is_comp_name, only_lower_case, only_upper_case, validate_only_component_names, validate_only_conditional_pseudos } from "./yaml_utils/validators";


/*
Example conditionals:
ME has HEARTS
ME has EIGHT of DIAMONDS
ME has CARD
ME has SUIT
CARD_PLAYED is SUIT
CURRENT_ROUND is EVEN and CARD_PLAYED is RANK
TARGET_PLAYER has SUIT
ME has 4 of any RANK
CURRENT_ROUND is ODD
CARD_PLAYED is HEARTS
HEARTS_BROKEN is false
CURRENT_ROUND is 1 or 2
CURRENT_ROUND is ODD and CARD_PLAYED is SUIT and CARD_PLAYED is RANK
ME has 3 of SUIT and ME has ODD CARD
ME has less than 4 CARDS
any PLAYER has more than 3 POINTS
no PLAYER has GOLD or SILVER
*/

export function parse_conditional(cond_str_list: ConditionalFromYAML, comp_glossary: ComponentGlossary, custom_vars: CustomVars, custom_enums: CustomEnums): Check {

    const conditional_pseudos = only_lower_case(cond_str_list) as PseudoConditionalString[];
    if (!validate_only_conditional_pseudos(conditional_pseudos)) throw new Error()

    //Split ands
    if (cond_str_list.includes("and")) {
        const condition_lists = break_at("and", cond_str_list)
        const checkers = condition_lists.map(cond => parse_atomic_conditional(cond, comp_glossary, custom_vars, custom_enums))
        return evaluate_checks_all(checkers)
    }
    return parse_atomic_conditional(cond_str_list, comp_glossary, custom_vars, custom_enums)
}

type ConditionalOperand = ReturnType<typeof resolve_operand_reference>


function parse_atomic_conditional(cond_str_list: ConditionalFromYAML, comp_glossary: ComponentGlossary, custom_vars: CustomVars, custom_enums: CustomEnums): Check {

    //atomic checks around comparison operators "is", "has"
    const operator = confirm_single_condition(cond_str_list);
    const [subj, obj] = break_at(operator, cond_str_list);

    const condition_operand_ref = subj.slice(-1)[0]

    //get first term
    let subj_operand = resolve_operand_reference(condition_operand_ref, comp_glossary, custom_vars, custom_enums)

    //split second operand by "or"
    const obj_array = break_at("or", obj)

    const obj_operands: ConditionalOperand[] = []
    for (const obj of obj_array) {
        if (obj.length > 1) throw new Error(`Expected single string operand, got ${obj}`)
        const ref = obj[0] as EnvObjectRefString
        obj_operands.push(resolve_operand_reference(ref, comp_glossary, custom_vars, custom_enums))
    }

    //create evaluation function based on operator
    if (operator === "is") {
        const evaluator: Check = (gst, args) => {
            const evaluated_subj = resolve_indepdendent_operand(subj_operand, gst)
            for (const obj_operand of obj_operands) {
                //case where object is a pure evaluator to run on the subject
                if (obj_operand.type === "predef_evaluator") {
                    return obj_operand.func(evaluated_subj as any)
                }
                const evaluated_obj = resolve_indepdendent_operand(obj_operand, gst)
                if (evaluated_subj === evaluated_obj) return true
            }
            return false
        }
        return evaluator;
    }

    // if (operator === "has") {
    //     const evaluator: Check = (gst, args) => {
    //         if (subj_operand.type !== "component") throw new Error(`Attempted to check conditional 'has' on parameter ${condition_operand_ref}`)

    //         const evaluated_subj = resolve_operand(subj_operand, gst, args.left_operands) as GameObject

    //         for (const obj of obj_operands) {
    //             const evaluated_obj = resolve_operand(obj, gst, args.right_operands)
    //             //obj is property

    //         }
    //     }
    // }
    throw new Error("Incomplete")
}

function resolve_operand_reference(ref: string, components: ComponentGlossary, custom_vars: CustomVars, custom_enums: CustomEnums) {
    //check for literals
    const literal_val = convert_literal(ref)
    if (literal_val) return { type: "literal", value: literal_val } as const;

    //check for predefined evaluators
    const predefined_evaluator = convert_to_predef_evaluator(ref)
    if (predefined_evaluator) return { type: "predef_evaluator", func: predefined_evaluator } as const

    //check for game vars
    if (custom_vars[ref] !== undefined) {
        return { type: "game_var", func: (gst: GameInstance) => gst.custom_vars[ref] } as const
    }

    //check for game enum properties
    for (const enum_name in custom_enums) {
        if (custom_enums[enum_name][ref]) {
            return { type: "enum_ref", enum_name, ref, enum_value: custom_enums[enum_name][ref] } as const
        }
    }

    //check for game components
    if (components[ref as EnvObjectRefString] !== undefined) return { type: "component", value: components[ref as EnvObjectRefString] } as const

    //a stone, a rose, an unfound ref
    throw new Error(`Conditional operand ${ref} is not recognised`)

}

function resolve_indepdendent_operand(operand: ConditionalOperand, gst: GameInstance) {
    if (operand.type === "literal") return operand.value;
    if (operand.type === "component") return operand.value;
    if (operand.type === "game_var") return operand.func(gst);
    if (operand.type === "enum_ref") return operand.enum_value
}

function confirm_single_condition(cond_str_list: unknown[]) {
    const operators = cond_str_list.filter(token => token === "has" || token === "is")
    if (operators.length !== 1) {
        throw new Error("Not a single conditional: " + cond_str_list)
    }
    return operators[0]
}

function evaluate_checks_all(funcs: Check[]): Check {
    const bulk_check: Check = (gst, args) => {
        for (const check of funcs) {
            if (!check(gst, args)) {
                return false
            }
        }
        return true
    }
    return bulk_check
}

function parse_has(cond_str_list: ConditionalFromYAML) {

}

function convert_to_predef_evaluator(ref: string) {
    if (Object.keys(predef_evaluators).includes(ref)) {
        return predef_evaluators[ref]
    }
    return undefined
}