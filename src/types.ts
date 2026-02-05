import { ComponentManager } from "./component_management/component_manager";
import Component from "./components/component";
import GameObject from "./components/game_object";
import { Effect } from "./core/effect";
import { GameInstance } from "./core/game_env";
import { Phase } from "./core/phase";
import Player from "./core/player";

export type LocationRef = string
export type PlayerMoveName = string[] & { __brand: "player_move" }

export type ComponentState = Record<string, GameObject>
export type Action = (gst: GameInstance, live_inputs?: Record<string, GameObject>) => void

export type EnumType = { [key: string]: string | number };

export type Constructor = new (...args: any[]) => {};

type PrefabRules = {
    name: string,
    [x: string]: any
}

export type PhaseRules = {
    name: string
    loop?: string
    allowed_moves?: string[]
    game_actions?: {
        name: string,
        [x: string]: any
    }[]
    phases: PhaseRules[]
    turn_order: "simultaneous" | "circle" | "custom" | undefined
    [x: string]: any
}

type MoveRule = {
    choose?: string
    effect: EffectRule
}

type PassiveRule = {
    trigger: string
    effect: EffectRule
}

type BlockerRule = {
    while: string
    illegal: string
}

export type EffectRule = string | {
    name: string
    input?: string
    action?: string
    check?: string
    true?: string
    false?: string
}

export type ComponentTypes = "meeple" | "token" | "card"

export type ComponentRule = {
    name: string
    type: ComponentTypes
    color?: string
    colors?: string[]
    number?: number
    contents?: ComponentRule[]
    text?: string
}

export type Rulebook = {
    meta: {
        name: string
        player_min: number
        player_max: number
    }
    base_game: PrefabRules | undefined
    prefabs: PrefabRules[]
    phases: PhaseRules[]
    custom_variables: Record<string, boolean | number | string>
    custom_components: Record<string, ComponentRule>
    custom_effects: Record<string, EffectRule>
    custom_moves: Record<string, MoveRule>
    custom_passives: Record<string, PassiveRule>
    custom_blockers: Record<string, BlockerRule>
}

export type Check = (gst: GameInstance, args?: unknown[]) => boolean
