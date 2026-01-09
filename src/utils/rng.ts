import seedrandom from "seedrandom"

const rng = seedrandom("default")
export default rng

export function shuffle(array: any[]) {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(rng() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

export function rng_range(minOrMax: number, max?: number): number {
    if (max === undefined) {
        return Math.floor(rng() * (minOrMax + 1));
    }
    return Math.floor(rng() * (max - minOrMax + 1)) + minOrMax;
}