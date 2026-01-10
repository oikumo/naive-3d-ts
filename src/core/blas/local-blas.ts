

export class LocalBlasModule {
    memory: WebAssembly.Memory;
    get buffer() { return this.memory.buffer; }
    get HEAPU8() { return new Uint8Array(this.buffer); }
    get HEAPU32() { return new Uint32Array(this.buffer); }
    get HEAPF32() { return new Float32Array(this.buffer); }

    #nextPtr: number = 8; // Start at 8 to avoid null-like pointer 0
    #exports: any;

    [key: string]: any;

    constructor(wasmExports: any) {
        this.#exports = wasmExports;
        this.memory = wasmExports.memory as WebAssembly.Memory;

        // Copy exports to this instance for direct access, except special ones
        for (const key in wasmExports) {
            if (key !== 'memory') {
                this[key] = wasmExports[key];
            }
        }

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

    ccall(name: string, _returnType: string | null, _argTypes: string[], args: any[]): any {
        if (this.#exports[name]) {
            return this.#exports[name](...args);
        }
        throw new Error(`ccall: function ${name} not implemented in WASM`);
    }

    modify_array(ptr: number, index: number, value: number): void {
        this.#exports.modify_array(ptr, index, value);
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
        this.#exports.drawTexToTex(destPtr, destWidth, srcPtr, srcWidth, srcHeight, destX, destY);
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
