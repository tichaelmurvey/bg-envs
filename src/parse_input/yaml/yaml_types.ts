import Component from "../../components/component"
import { PlayerMove } from "../../core/action/player_move"
import { Effect } from "../../core/effect"
import { Phase } from "../../core/phase"
import Player from "../../core/player"
import { Action, PCardSuit, PCardRank } from "../../types"
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

export type ComponentQuery = (...args: any[]) => Component | Component[] | Player | Player[] | Phase
export type ConditionalWithComponents = (PseudoConditionalString | ComponentQuery)[]

export type Glossary = {
    actions: ActionGlossary
    components: ComponentGlossary
}

export type CustomVars = Record<string, string | number | boolean>
export type EffectGlossary = Record<string, Effect>
export type ActionGlossary = Record<EnvMethodRefString, Action>
export type MoveGlossary = Record<string, PlayerMove>
export type ComponentGlossary = Record<EnvObjectRefString, ComponentQuery>

