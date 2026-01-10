import { Blas } from "./blas";

export class BlasArrayF32 {
    length: number = 0;
    ptr: number = 0;
    blas: Blas;

    #cachedData: Float32Array | null = null;
    #lastBufferReference: ArrayBuffer | null = null;

    constructor(blas: Blas, length: number) {
        this.blas = blas;
        this.length = length;
        this.ptr = this.blas.module._malloc(length * Float32Array.BYTES_PER_ELEMENT);

        const initialView = this.data;
        for (let i = 0; i < this.length; i++) {
            initialView[i] = 0;
        }
    }

    get data() {
        if (this.blas.module.buffer !== this.#lastBufferReference || !this.#cachedData) {
            this.#lastBufferReference = this.blas.module.buffer;
            this.#cachedData = new Float32Array(
                this.#lastBufferReference,
                this.ptr,
                this.length);
        }
        return this.#cachedData;
    }
}

export class BlasArrayUint32 {
    length: number = 0;
    ptr: number = 0;
    blas: Blas;

    #cachedData: Uint32Array | null = null;
    #lastBufferReference: ArrayBuffer | null = null;

    constructor(blas: Blas, length: number) {
        this.blas = blas;
        this.length = length;
        this.ptr = this.blas.module._malloc(length * Uint32Array.BYTES_PER_ELEMENT);
    }

    get data() {
        if (this.blas.module.buffer !== this.#lastBufferReference || !this.#cachedData) {
            this.#lastBufferReference = this.blas.module.buffer;
            this.#cachedData = new Uint32Array(
                this.#lastBufferReference,
                this.ptr,
                this.length);
        }
        return this.#cachedData;
    }
}