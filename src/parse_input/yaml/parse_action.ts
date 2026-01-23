
/*
EXAMPLE ACTIONS
set HEARTS_BROKEN to true
move SELECTION from ME to LEFT_PLAYER
play_on_table all RANK from ME
move all SUIT from TARGET_PLAYER to ME then new_turn for ME
set all SUIT of ME to ACE
*/

import { GameInstance } from "../../core/game_env";
import { Action } from "../../types";
import { break_at } from "../../utils/break_array_at";
import { CustomVars } from "./yaml_types";
import { convert_literal } from "./yaml_utils/convert_literals";

export type ParseActionContext = {
    input_params?: string[]
    custom_vars: CustomVars
    custom_consts: CustomVars
}

export type RuntimeGetter = ((gst: GameInstance) => void)

export default function parse_action(action_ref: string, context: ParseActionContext): Action {
    //split to list
    const action_words = action_ref.split(" ");
    //break and recurse around "then"
    const atomic_actions = break_at("then", action_words);
    if (atomic_actions.length > 1) {
        throw new Error("unhandled action with then")
        // return fuse_actions(atomic_actions)
    }

    return parse_atomic_action(atomic_actions[0], context)
}

export function parse_atomic_action(action_words: string[], context: ParseActionContext) {
    console.log("atomic action context", context)
    //resolve references to other effects

    //confirm action has only one executable term (is, move, predef)
    const executable = confirm_single_executable(action_words)

    if (executable === "set") {
        const [target_ref, value_ref] = break_at("to", action_words);

        //Setter function for value being changed
        let setter: (gst: GameInstance, new_value: string | boolean | number) => void;
        for (const word of target_ref) {
            if (Object.keys(context.custom_vars).includes(word)) {
                setter = (gst: GameInstance, new_value: string | boolean | number) => { gst.custom_vars[word] = new_value }
            }
        }

        //Figure out what to change it to
        if (value_ref.length !== 1) throw new Error("Unhandled complex value case")
        const value_ref_str = value_ref[0]

        const value_obj = get_value_obj(value_ref_str, context)

        return (gst: GameInstance) => {
            setter(gst, value_obj)
        }
    }
    throw new Error("Unhandled move action")
}


function get_value_obj(value_ref_str: string, context: ParseActionContext) {
    const literal_value = convert_literal(value_ref_str)
    if (literal_value !== undefined) return literal_value;
    if (context.custom_consts[value_ref_str] !== undefined) {
        return context.custom_consts[value_ref_str]
    }

    throw new Error("Unhandled value ref case " + value_ref_str)
}

function confirm_single_executable(action_words: string[]) {
    const execs = action_words.filter(token => token === "set" || token === "move")
    if (execs.length !== 1) {
        throw new Error("Not a single executable: " + action_words)
    }
    return execs[0]
}

// function set_target(target: string[]) {
//     const default_arg = target[0]
//     if (target.length !== 1) throw new Error("Unhandled complex argument case")
//     if (typeof default_arg === "string") throw new Error("Unhandled string argument")
//     return (gst: GameInstance) => 
// }

function resolve_value(value: (string | ((gst: GameInstance) => void))[]) {
    return (gst: GameInstance) => true
}
