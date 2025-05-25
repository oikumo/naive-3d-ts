import * as blasWasm from 'naive-blas-wasm';
import { BlasArrayUint32 } from './blas-array';


export class Blas {
    module: blasWasm.MainModule;
    sharedArrays = new Map<string, BlasArrayUint32>();

    constructor(blas: blasWasm.MainModule) {
        this.module = blas;
    }

    getArray(id: string) : BlasArrayUint32 | null {
        const texture = this.sharedArrays.get(id);
        if (texture === undefined) return null;
        return texture;
    }

    createSharedArray(id: string,length: number) {
        const sharedArray = new BlasArrayUint32(this.module, length);
        this.sharedArrays.set(id, sharedArray);

        return sharedArray;
    }

    builtInModifyArray(ptr: number, index: number, value: number) {
        this.module.ccall("modify_array", null, ["number", "number", "number"], [ptr, index, value]);
    }
}
