

interface WasmExports {
    memory: WebAssembly.Memory;
    __heap_base?: { value: number };
    modify_array?(ptr: number, index: number, value: number): void;
    drawTexToTex?(
        destPtr: number,
        destWidth: number,
        srcPtr: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destY: number
    ): void;
    drawTexToTexScaled?(
        destPtr: number,
        destWidth: number,
        srcPtr: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destY: number,
        destScaleX: number,
        destScaleY: number
    ): void;
    [key: string]: unknown;
}

export class LocalBlasModule {
    memory: WebAssembly.Memory;
    Data: new () => {
        createArray(length: number): void;
        set(index: number, value: number): void;
        get(index: number): number;
    };

    #lastBufferReference: ArrayBuffer | null = null;
    #cachedHEAPU8: Uint8Array | null = null;
    #cachedHEAPU32: Uint32Array | null = null;
    #cachedHEAPF32: Float32Array | null = null;

    get buffer() { return this.memory.buffer; }

    get HEAPU8() {
        this.#checkBuffer();
        if (!this.#cachedHEAPU8) this.#cachedHEAPU8 = new Uint8Array(this.buffer);
        return this.#cachedHEAPU8;
    }

    get HEAPU32() {
        this.#checkBuffer();
        if (!this.#cachedHEAPU32) this.#cachedHEAPU32 = new Uint32Array(this.buffer);
        return this.#cachedHEAPU32;
    }

    get HEAPF32() {
        this.#checkBuffer();
        if (!this.#cachedHEAPF32) this.#cachedHEAPF32 = new Float32Array(this.buffer);
        return this.#cachedHEAPF32;
    }

    #checkBuffer() {
        if (this.buffer !== this.#lastBufferReference) {
            this.#lastBufferReference = this.buffer;
            this.#cachedHEAPU8 = null;
            this.#cachedHEAPU32 = null;
            this.#cachedHEAPF32 = null;
        }
    }

    #nextPtr: number = 8; // Start at 8 to avoid null-like pointer 0
    #exports: WasmExports;

    [key: string]: unknown;

    constructor(wasmExports: any) {
        this.#exports = wasmExports;
        if (!wasmExports.memory) {
            throw new Error("WASM module must export 'memory'. Please check your AssemblyScript compilation settings.");
        }
        this.memory = wasmExports.memory as WebAssembly.Memory;

        // Copy exports to this instance for direct access, except special ones
        for (const key in wasmExports) {
            if (key !== 'memory') {
                this[key] = wasmExports[key];
            }
        }

        // Add mock Data class for integration tests
        this.Data = class {
            private array: Uint32Array | null = null;
            createArray(length: number) {
                this.array = new Uint32Array(length);
            }
            set(index: number, value: number) {
                if (this.array) this.array[index] = value;
            }
            get(index: number) {
                return this.array ? this.array[index] : 0;
            }
        };

        // Start after the WASM heap base to avoid collisions with internal data
        this.#nextPtr = wasmExports.__heap_base ? wasmExports.__heap_base.value : 1024;
    }

    _malloc(size: number): number {
        const ptr = this.#nextPtr;
        this.#nextPtr += size;

        // Basic alignment to 8 bytes
        if (this.#nextPtr % 8 !== 0) {
            this.#nextPtr += 8 - (this.#nextPtr % 8);
        }

        if (this.#nextPtr > this.buffer.byteLength) {
            throw new Error("Out of memory in LocalBlasModule");
        }
        return ptr;
    }

    ccall(name: string, _returnType: string | null, _argTypes: string[], args: unknown[]): unknown {
        const func = this.#exports[name];
        if (typeof func === 'function') {
            return (func as (...args: unknown[]) => unknown)(...args);
        }
        throw new Error(`ccall: function ${name} not implemented in WASM`);
    }

    setValue(ptr: number, value: number, type: string): void {
        const buffer = this.buffer;
        switch (type) {
            case 'i8': new Int8Array(buffer, ptr, 1)[0] = value; break;
            case 'i16': new Int16Array(buffer, ptr, 1)[0] = value; break;
            case 'i32': new Int32Array(buffer, ptr, 1)[0] = value; break;
            case 'f32': new Float32Array(buffer, ptr, 1)[0] = value; break;
            case 'f64': new Float64Array(buffer, ptr, 1)[0] = value; break;
            default: throw new Error(`setValue: Unsupported type ${type}`);
        }
    }

    _free_array(_ptr: number): void {
        // No-op in this local bump allocator
    }

    stackAlloc(size: number): number {
        return this._malloc(size);
    }

    stringToUTF8(str: string, outPtr: number, maxBytes: number): number {
        const view = this.HEAPU8;
        let i = 0;
        for (; i < str.length && i < maxBytes - 1; i++) {
            view[outPtr + i] = str.charCodeAt(i);
        }
        view[outPtr + i] = 0;
        return outPtr;
    }

    UTF8ToString(ptr: number): string {
        const view = this.HEAPU8;
        let str = "";
        let i = ptr;
        while (view[i] !== 0) {
            str += String.fromCharCode(view[i]);
            i++;
        }
        return str;
    }

    modify_array(ptr: number, index: number, value: number): void {
        const func = this.#exports.modify_array;
        if (typeof func === 'function') {
            func(ptr, index, value);
        } else {
            throw new Error(`modify_array function not available in WASM module`);
        }
    }

    drawTexToTex(
        destPtr: number,
        destWidth: number,
        srcPtr: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destY: number
    ): void {
        const func = this.#exports.drawTexToTex;
        if (typeof func === 'function') {
            func(destPtr, destWidth, srcPtr, srcWidth, srcHeight, destX, destY);
        } else {
            throw new Error(`drawTexToTex function not available in WASM module`);
        }
    }

    drawTexToTexScaled(
        destPtr: number,
        destWidth: number,
        srcPtr: number,
        srcWidth: number,
        srcHeight: number,
        destX: number,
        destY: number,
        destScaleX: number,
        destScaleY: number
    ): void {
        const func = this.#exports.drawTexToTexScaled;
        if (typeof func === 'function') {
            func(destPtr, destWidth, srcPtr, srcWidth, srcHeight, destX, destY, destScaleX, destScaleY);
        } else {
            throw new Error(`drawTexToTexScaled function not available in WASM module`);
        }
    }
}

const wasmUrl = new URL('./wasm/build/release.wasm', import.meta.url).href;

export default async function loadLocalBlas() {
    let buffer: ArrayBuffer;
    if (typeof window !== 'undefined') {
        const response = await fetch(wasmUrl);
        buffer = await response.arrayBuffer();
    } else {
        // Node environment for tests
        const fs = await import(/* @vite-ignore */ 'fs');
        const path = await import(/* @vite-ignore */ 'path');
        const { fileURLToPath } = await import(/* @vite-ignore */ 'url');

        // __dirname is not available in ES modules in all Node versions without this
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const wasmPath = path.resolve(__dirname, './wasm/build/release.wasm');
        const nodeBuffer = fs.readFileSync(wasmPath);
        buffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength);
    }

    const { instance } = await WebAssembly.instantiate(buffer, {
        env: {
            abort: (_msg: any, _file: any, _line: any, _col: any) => {
                console.error(`abort called`);
            }
        }
    });

    return new LocalBlasModule(instance.exports);
}
