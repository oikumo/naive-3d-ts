export class RenderTexture {
    
    public buf8: Uint8ClampedArray;
    public texture: Uint32Array;

    constructor(width: number, height: number) {
        const size = width * height * 4; // 4 bytes per pixel (RGBA)
        const buf = new ArrayBuffer(size);
        this.buf8 = new Uint8ClampedArray(buf);
        this.texture = new Uint32Array(buf);
    }

    clear(bgColor: number) {
        this.texture.fill(bgColor);
    }
}