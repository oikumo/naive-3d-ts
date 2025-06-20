export abstract class CoreBuffer<T extends RelativeIndexable<number>> {
    #capacity: number;
    #elementSize: number;
    protected buffer: T | null = null;

    get capacity() { return this.#capacity; }
    get elementSize() { return this.#elementSize; }

    constructor(capacity: number, elementSize: number) {
        this.#capacity = capacity;
        this.#elementSize = elementSize;
        this.create();
    }

    protected abstract create() : void;
    
}

export class CoreBufferF32 extends CoreBuffer<Float32Array> {

    protected override create(): void {
        const elements = this.capacity * this.elementSize;
        this.buffer = new Float32Array(elements);
    }
}