export function hasOwn<T extends object, K extends PropertyKey>(
    obj: T,
    key: K
): obj is T & Record<K, unknown> {
    return Object.hasOwn(obj, key);
}

export type EnumValue<T extends Record<string, string | number>> = T[keyof T];
