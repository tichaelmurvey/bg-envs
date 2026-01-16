export function hasOwn<T extends object, K extends PropertyKey>(
    obj: T,
    key: K
): obj is T & Record<K, unknown> {
    return Object.hasOwn(obj, key);
}

export type EnumValue<T extends Record<string, string | number>> = T[keyof T];

export function get_keys<T extends Object>(obj: T) { Object.keys(obj) as Array<keyof T> }