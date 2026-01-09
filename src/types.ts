export type LocationRef = string

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