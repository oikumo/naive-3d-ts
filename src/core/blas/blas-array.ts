import { MainModule } from "naive-blas-wasm";
import { Blas } from "./blas";

export class BlasArrayF32 {
    length: number = 0;
    ptr: number = 0;
    data: Float32Array;
    blas: Blas;

    constructor(blas: Blas, length: number) {
        this.blas = blas;
        this.length = length;
        this.ptr = this.blas.module._malloc(length * Float32Array.BYTES_PER_ELEMENT);

        this.data = new Float32Array(
            blas.module.HEAPU8.buffer,
            this.ptr,
            length);

        const initialView = this.view;
            for (let i = 0; i < this.length; i++) {
            initialView[i] = NaN;
        }
    }

    get view() {
        return new Float32Array(
        this.blas.module.HEAPU8.buffer, // Always fresh reference
        this.ptr,
        this.length);
    }
}

export class BlasArrayUint32 {
    length: number = 0;
    ptr: number = 0;
    data: Uint32Array;

    constructor(blas: MainModule, length: number) {
        this.length = length;
        this.ptr = blas._malloc(length * Uint32Array.BYTES_PER_ELEMENT);

        this.data = new Uint32Array(
            blas.HEAPU32.buffer,
            this.ptr,
            length);
    }
}