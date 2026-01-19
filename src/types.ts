import { ComponentManager } from "./component_management/types";
import Component from "./components/component";

export type LocationRef = string
export type PlayerMove = string[] & { __brand: "player_move" }

export type GameObject = Component | ComponentManager
export type ComponentState = Record<string, GameObject>

export enum PCardSuit {
    Hearts,
    Diamonds,
    Spades,
    Clubs
}

export enum PCardVal {
    Ace = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King
}

export type Constructor = new (...args: any[]) => {};

type PrefabRules = {
    name: string,
    [x: string]: any
}

export type PhaseRules = {
    name: string
    loop: string
    allowed_moves?: string[]
    game_actions?: {
        name: string,
        [x: string]: any
    }[]
    phases: PhaseRules[]
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

type EffectRule = string | {
    check?: string
    true?: string
    false?: string
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
    custom_moves: Record<string, MoveRule>
    custom_passives: Record<string, PassiveRule>
    custom_blockers: Record<string, BlockerRule>
}