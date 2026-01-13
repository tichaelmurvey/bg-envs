import Player from "../../core/player"
import { PCardSuit, PCardVal } from "../../types"
import { EnumValue } from "../../utils/type_utils"

export type EnvObjectRefString = string & { readonly __brand: 'component' }
export type EnvMethodString = string & { readonly __brand: 'env_method' }
export type PseudocodeString = "and" | "or" | "has" | "any" | "of" | "from" | "move" | "all" | "to" | "for" | string & { readonly __brand: 'pseudo' }

export type SymbolFromYAML = (EnvObjectRefString | EnvMethodString | PseudocodeString)
export type ExecutableFromYAML = SymbolFromYAML[]
export type ConditionalFromYAML = (PseudocodeString | EnvObjectRefString)[]

export type Glossary = Record<EnvObjectRefString, any>
