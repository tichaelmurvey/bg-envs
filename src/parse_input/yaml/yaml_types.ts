import { ComponentManager } from "../../component_management/component_manager"
import Component from "../../components/component"
import GameObject from "../../components/game_object"
import { PlayerMove } from "../../core/action/player_move"
import { Effect } from "../../core/effect"
import { GameInstance } from "../../core/game_env"
import { Phase } from "../../core/phase"
import Player from "../../core/player"
import { Action, EnumType } from "../../types"
import { EnumValue } from "../../utils/type_utils"

export type EnvObjectRefString = string & { readonly __brand: 'component' }
export type EnvMethodRefString = string & { readonly __brand: 'env_method' }

export const PSEUDO_METHOD_EXEC_LITERALS = ["and", "then", "set", "move", "from", "to", "each", "of",] as const;
export type PseudoMethodExecString =
    | typeof PSEUDO_METHOD_EXEC_LITERALS[number]
    | `${number}`;


export const PSEUDO_CONDITIONAL_LITERALS = ["and", "or", "any", "of", "has", "is", "all"] as const;
export type PseudoConditionalString =
    | typeof PSEUDO_CONDITIONAL_LITERALS[number]
    | `${number}`;

export type YAMLPseudoSymbol = (EnvObjectRefString | EnvMethodRefString | PseudoMethodExecString | PseudoConditionalString)

export type ExecutableFromYAML = EnvObjectRefString | EnvMethodRefString | PseudoMethodExecString

export type ConditionalFromYAML = (PseudoConditionalString | EnvObjectRefString)[]

export type GameObjQuery = (gst: GameInstance, live_inputs?: Record<string, GameObject>) => GameObject
export type ConditionalWithComponents = (PseudoConditionalString | GameObjQuery)[]

export type CustomEnums = Record<string, EnumType>
export type CustomVars = Record<string, string | number | boolean>
export type EffectGlossary = Record<string, Effect>
export type ActionGlossary = Record<EnvMethodRefString, Action>
export type MoveGlossary = Record<string, PlayerMove>
export type ComponentGlossary = Record<EnvObjectRefString, GameObject>
export type GameObjectLookups = Record<string, GameObjQuery>

