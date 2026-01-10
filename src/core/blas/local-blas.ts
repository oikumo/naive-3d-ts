
export class LocalBlasModule {
    buffer: ArrayBuffer;
    HEAPU8: Uint8Array;
    HEAPU32: Uint32Array;
    HEAPF32: Float32Array;
    #nextPtr: number = 8; // Start at 8 to avoid null-like pointer 0

    constructor(initialMemorySize: number = 1024 * 1024 * 16) { // 16MB default
        this.buffer = new ArrayBuffer(initialMemorySize);
        this.HEAPU8 = new Uint8Array(this.buffer);
        this.HEAPU32 = new Uint32Array(this.buffer);
        this.HEAPF32 = new Float32Array(this.buffer);
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

    ccall(name: string, returnType: string | null, argTypes: string[], args: any[]): any {
        if (name === "modify_array") {
            return this.modify_array(args[0], args[1], args[2]);
        }
        throw new Error(`ccall: function ${name} not implemented`);
    }

    modify_array(ptr: number, index: number, value: number): void {
        const uint32View = new Uint32Array(this.buffer, ptr);
        uint32View[index] = value;
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
        const destView = new Uint32Array(this.buffer, destPtr);
        const srcView = new Uint32Array(this.buffer, srcPtr);

        for (let y = 0; y < srcHeight; y++) {
            for (let x = 0; x < srcWidth; x++) {
                const targetX = Math.floor(destX + x);
                const targetY = Math.floor(destY + y);

                // Basic bounds checking
                if (targetX >= 0 && targetX < destWidth) {
                    const destIdx = targetY * destWidth + targetX;
                    const srcIdx = y * srcWidth + x;

                    // Simple blit - assuming destView is large enough
                    if (destIdx >= 0 && destIdx < destView.length) {
                        destView[destIdx] = srcView[srcIdx];
                    }
                }
            }
        }
    }
}

export default async function loadLocalBlas() {
    return new LocalBlasModule();
}
