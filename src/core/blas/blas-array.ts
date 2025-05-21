import { Blas } from "./blas";

export class BlasArray<T extends RelativeIndexable<number>> {
    length: number = 0;
    ptr: number = 0;
    data: T;

    constructor(ptr: number, data: T, length: number) {
        this.ptr = ptr;
        this.data = data;
        this.length = length;
    }


    info() {
        if(this.data === null) throw Error();
        const message = [];
    
        for (let i = 0; i < this.length; i++) {
            message.push(this.data.at(i));
        }

        return 'data: [' + message.join(', ') + ']';
    }

    static createFloat32Array(blas: Blas, length: number) {
        const bytes = 4;
        const ptr = blas.module._malloc(length * bytes);

        const data = new Float32Array(
            blas.module.HEAPU32.buffer,
            ptr,
            length);

        return new BlasArray<Float32Array>(ptr, data, length);
    }
}
