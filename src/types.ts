import { ComponentManager } from "./component_management/types";
import Component from "./components/component";

export type LocationRef = string

export type GameObject = Component | ComponentManager
export type ComponentState = Record<string, GameObject>

export enum PCardSuit {
    Hearts,
    Diamonds,
    Spades,
    Clubs
}

export enum PCardVal {
    Ace,
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