import { PCardSuit, PCardVal } from "../../types"
import { EnumValue } from "../../utils/type_utils"

export type ComponentNameString = string
export type EnvMethodString = string
export type PseudocodeString = "and" | "or" | "has" | "any" | "of" | "from" | "move" | "all" | "to" | "for"

export type SymbolFromYAML = (ComponentNameString | EnvMethodString | PseudocodeString)
export type ExecutableFromYAML = SymbolFromYAML[]

export type Glossary = Record<SymbolFromYAML, any>



const x: Glossary = {
    "SUIT": PCardSuit,
    "ehee": 0,
}

console.log(x)