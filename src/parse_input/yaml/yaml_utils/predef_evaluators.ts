export const predef_evaluators: Record<string, ((arg: number) => boolean)> = {
    "ODD": (arg: number) => arg % 2 === 1,
    "EVEN": (arg: number) => arg % 2 === 0,
}