
export class Effect<T, R> {
    constructor(
        public name: string,
        public resolve_func: (args: T) => R
    ) { }

    resolve(args: T): R {
        return this.resolve_func(args)
    }
}