export function convert_literal(game_noun: string) {
    if (!isNaN(Number(game_noun))) {
        return Number(game_noun)
    }

    switch (game_noun) {
        case "true":
            return true
        case "false":
            return false
        default:
            return undefined
    }
}
