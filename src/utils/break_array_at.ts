export function break_at<T>(delimiter: T, arr: T[]): T[][] {
    const result: T[][] = [];
    let start = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === delimiter) {
            result.push(arr.slice(start, i));
            start = i + 1;
        }
    }

    // Add remaining elements after the last delimiter
    if (start < arr.length) {
        result.push(arr.slice(start));
    }

    return result;
}