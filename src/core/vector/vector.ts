export class Vector {
    #data: Uint32Array;
    #length: number = 0;

    constructor(data: Uint32Array | null = null) {
        this.#data = data? data : new Uint32Array(); 
        this.#calculateLength();  
    }

    static create(length: number) {
        return new Vector(new Uint32Array(length));
    }

    get length() { return this.#length; }

    access(dataAccessFunction: (data: Uint32Array) => void ) {
        dataAccessFunction(this.#data);
    }

    #calculateLength() {
        this.#length = this.#data ? this.#data.length : 0;
    }

    log() {
        let message = new Array<number>();
        for (let i = 0; i < this.#data.length; i++) {
            message.push(this.#data[i]);
        }

        console.log(message.join(','), '\n');
    }
}