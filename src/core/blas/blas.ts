import * as blasWasm from 'naive-blas-wasm';
import { BlasArray } from './blas-array';


export class Blas {
    module: blasWasm.MainModule;
    sharedArrays = new Map<string, BlasArray<Uint32Array>>();

    constructor(blas: blasWasm.MainModule) {
        this.module = blas;
    }

    getArray(id: string) : BlasArray<Uint32Array> | null {
        const texture = this.sharedArrays.get(id);
        if (texture === undefined) return null;
        return texture;
    }

    createSharedArray(id: string,length: number) {
        const bytes = 4;
        const ptr = this.module._malloc(length * bytes);
        const data = new Uint32Array(
            this.module.HEAPU32.buffer,
            ptr,
            length);

        const sharedArray = new BlasArray<Uint32Array>(ptr, data, length);
        this.sharedArrays.set(id, sharedArray);

        return sharedArray;
    }

    builtInModifyArray(ptr: number, index: number, value: number) {
        this.module.ccall("modify_array", null, ["number", "number", "number"], [ptr, index, value]);
    }
}
