
/*
EXAMPLE ACTIONS
set HEARTS_BROKEN to true
HEARTS_BROKEN is true
move SELECTION from ME to LEFT_PLAYER
play_on_table all RANK from ME
move all SUIT from TARGET_PLAYER to ME then new_turn for ME
set all SUIT of ME to ACE
*/

import { ComponentManager } from "../../component_management/component_manager";
import Component from "../../components/component";
import GameObject from "../../components/game_object";
import { GameInstance } from "../../core/game_env";
import { Action } from "../../types";
import { break_at } from "../../utils/break_array_at";
import { GameObjectLookups, CustomVars, GameObjQuery, EffectGlossary } from "./yaml_types";
import { convert_literal } from "./yaml_utils/convert_literals";

export type ParseActionContext = {
    input_params?: string[]
    custom_vars: CustomVars
    custom_consts: CustomVars
    comp_lookups: GameObjectLookups
    existing_effects: EffectGlossary
}

export type RuntimeGetter = ((gst: GameInstance) => void)

export default function parse_action(action_ref: string, context: ParseActionContext): Action {
    //split to list
    const action_words = action_ref.split(" ");
    //break and recurse around "then"
    const atomic_actions = break_at("then", action_words);
    if (atomic_actions.length > 1) {
        const resolvers: ((gst: GameInstance) => void)[] = []
        for (const action_words of atomic_actions) {
            resolvers.push(parse_atomic_action(action_words, context))
        }
        return (gst: GameInstance) => {
            resolvers.forEach(resolver => resolver(gst))
        }
    }

    return parse_atomic_action(atomic_actions[0], context)
}

export function parse_atomic_action(action_words: string[], context: ParseActionContext): Action {
    //resolve references to other effects
    if (context.existing_effects[action_words[0]]) {
        return context.existing_effects[action_words[0]].resolve_func
    }

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

    if (executable === "move") {
        const action_words_without_move = action_words.filter(word => word !== "move")
        const [subject_ref, dest_ref] = break_at("to", action_words_without_move);
        const [moveable_ref, origin_ref] = break_at("from", subject_ref)
        /*
        e.g. move SELECTION from ME to LEFT_PLAYER
        moveable_ref =  move SELECTION
        origin_ref = ME
        dest_ref = LEFT_PLAYER
        */
        const origin = get_game_object(origin_ref, context)
        const dest = get_game_object(dest_ref, context)

        const moveable_component = get_game_object(moveable_ref, context)

        return (gst: GameInstance, live_inputs?: Record<string, GameObject>) => {
            //get origin
            const live_origin = origin(gst, live_inputs)

            //get destination
            const live_destination = dest(gst, live_inputs)

            //get moveable
            const moveable_component_live = moveable_component(gst, live_inputs)
            if (!((moveable_component_live instanceof Component) || (moveable_component_live instanceof ComponentManager))) throw new Error("Moveable component is not a component or component manager")

            //remove reference from origin
            const originData = live_origin.get_component(moveable_component_live.name)
            if (!originData) throw new Error(`Couldn't find component ${moveable_component_live.name} in origin ${live_origin.name}`)
            originData.manager.contents = originData.manager.contents.filter(component => component === moveable_component_live)

            //add reference in destination
            if (!(live_destination instanceof ComponentManager)) throw new Error("Destination is not a component manager")
            live_destination.contents.push(moveable_component_live)
        }
    }

    throw new Error("Unable to resolve atomic action parsing")
}

// function get_moveable_component(moveable_ref: string[], context: ParseActionContext): (gst: GameInstance, input_params?: Record<string, GameObject>) => GameObject {
//     if (moveable_ref.length !== 1) throw new Error("Unhandled complex moveable ref case");
//     const moveable_str = moveable_ref[0]

//     //check input input_params
//     const input_param = check_input_params(moveable_str, context.input_params)
//     if (input_param !== undefined) return input_param
// }


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

function get_game_object(obj_ref: string[], context: ParseActionContext): GameObjQuery {
    if (obj_ref.length !== 1) throw new Error("Unhandled complex gameobject ref case");
    const obj_str = obj_ref[0]

    //check if inputs includes origin ref
    const input_param = check_input_params(obj_str, context.input_params)
    if (input_param !== undefined) return input_param

    //check game component lookups
    if (context.comp_lookups[obj_str] !== undefined) {
        return context.comp_lookups[obj_str]
    }

    throw new Error(`Attempted lookup of component ${obj_str} failed.`)
}

function check_input_params(obj_str: string, input_params?: string[] | undefined) {
    if (!input_params) return undefined
    if (!input_params.includes(obj_str)) return undefined

    const live_input_resolver: GameObjQuery = (gst: GameInstance, live_inputs?: Record<string, GameObject>) => {
        if (live_inputs === undefined) throw new Error(`Expected live input ${obj_str} but live_inputs is undefined`)
        if (live_inputs[obj_str] === undefined) throw new Error(`Expected live input ${obj_str} is undefined`)
        return live_inputs[obj_str]
    }

    return live_input_resolver
}

