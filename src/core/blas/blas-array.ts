import { Blas } from "./blas";

export class BlasArrayF32 {
    length: number = 0;
    ptr: number = 0;
    blas: Blas;

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
        return new Float32Array(
            this.blas.module.HEAPU8.buffer,
            this.ptr,
            this.length);
    }
}

export class BlasArrayUint32 {
    length: number = 0;
    ptr: number = 0;
    blas: Blas;

    constructor(blas: Blas, length: number) {
        this.blas = blas;
        this.length = length;
        this.ptr = this.blas.module._malloc(length * Uint32Array.BYTES_PER_ELEMENT);
    }

    get data() {
        return new Uint32Array(
            this.blas.module.HEAPU8.buffer,
            this.ptr,
            this.length);
    }
}