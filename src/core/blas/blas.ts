import * as blasWasm from 'naive-blas-wasm';
import { SharedArray } from './blas-shared-array';


export class Blas {
    blas: blasWasm.MainModule;
    sharedArrays = new Map<string, SharedArray<Uint32Array>>();

    constructor(blas: blasWasm.MainModule) {
        this.blas = blas;
    }

    getArray(id: string) : SharedArray<Uint32Array> | null {
        const texture = this.sharedArrays.get(id);
        if (texture === undefined) return null;
        return texture;
    }

    createSharedArray(id: string,length: number) {
        const bytes = 4;
        const ptr = this.blas._malloc(length * bytes);
        const data = new Uint32Array(
            this.blas.HEAPU32.buffer,
            ptr,
            length);

        const sharedArray = new SharedArray<Uint32Array>(ptr, data, length);
        this.sharedArrays.set(id, sharedArray);

        return sharedArray;
    }

    builtInModifyArray(ptr: number, index: number, value: number) {
        this.blas.ccall("modify_array", null, ["number", "number", "number"], [ptr, index, value]);
    }

    testFunctions() {
        console.log('-----FUNCTIONS');
        console.log(`1. blas draw function call: ${this.blas.draw(2222)}`);
        console.log(`2. blas int_sqrt function call: ${this.blas.int_sqrt(9)}`);

        const strPtr = this.blas.stringToUTF8("Hello WASM", this.blas.stackAlloc(256), 256);
        console.log(`3. stack string utf8`, strPtr, this.blas.UTF8ToString(strPtr));
    }

    testArrays() {
        const log = [];

        log.push('-----ARRAYS');
        const array = this.createSharedArray("TEST_1", 10);
        if (array.data === null) throw Error();
        if (array.ptr === null) throw Error();

        log.push('1. array. ', array.info());

        this.builtInModifyArray(array.ptr, 2, 999);
        log.push('2. array modified via ccall function index: 2, value: 999. ', array.info());

        array.data[0] = 997;
        array.data[1] = 998;
        log.push('3. array modified directly. ', array.info());

        this.blas.modify_array(array.ptr, 3, 1000);
        log.push('4. modification by blas wasm function', array.info());

        this.blas.multiply(5, array.ptr, array.length);
        log.push('5. multiplication by 5 using blas wasm function', array.info());

        const ptrOffset = 4;
        this.blas.setValue(array.ptr + ptrOffset, 42, "i32");
        log.push('6. direct memory write access by pointer', array.info());

        this.blas._free_array(array.ptr);
        log.push('7. after array free memory', array.info());

        return log;
    }

    testClasses() {
        console.log('-----CLASSES');
        const data = new this.blas.Data();
        data.createArray(100000);

        for (let i = 0; i < 100000; i++) {
            data.set(i, 99);
        }


        const log = new Array<number>();

        for (let i = 0; i < 100000; i++) {
            log.push(data.get(i));
        }


        console.log('2. class Data instance pre delete. ', data);
        data.delete;
        console.log('3. class Data instance post delete. ', data);
    }
}
