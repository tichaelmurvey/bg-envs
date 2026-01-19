export function convert_literals(game_noun: string) {
    if (!isNaN(Number(game_noun))) {
        return () => Number(game_noun)
    }

    switch (game_noun) {
        case "true":
            return () => true
        case "false":
            return () => false
        case "ODD":
            return (subj: number) => subj % 2 == 1
        case "EVEN":
            return (subj: number) => subj % 2 == 0
        default:
            return undefined
    }
}