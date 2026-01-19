class Component {
    name: string | undefined;
    foo: number = 3
    constructor(name?: string) {
        this.name = name;
    }
}

export default Component