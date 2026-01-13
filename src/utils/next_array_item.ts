export default function next_item<T>(array: T[], value: T) {
    const index = array.indexOf(value) + 1;
    if (index === 0) {
        throw new Error(`next_item called but value ${value} not in array ${array}`)
    }
    if (index >= array.length)
        return array[0];
    else {
        return array[index]
    }
}