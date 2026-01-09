import { rng_range } from "./utils/rng"
console.log(rng_range(10))
console.log(rng_range(-100, 10))

class opt1 {
    foo: string = "bar"
    wham: string = "whoo"
}

class opt2 {
    foo: string = "bar"
}

const obj1 = new opt1
const obj2 = new opt2

type Obj = {
    foo: string
    wham?: string
}

function printstuff(obj: Obj) {
    console.log(obj.foo)
    console.log(obj.wham)
}

printstuff(obj1)
printstuff(obj2)