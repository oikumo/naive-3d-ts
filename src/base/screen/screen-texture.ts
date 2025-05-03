export class ScreenTexture {
    
    public buf8: Uint8ClampedArray;
    public texture: Uint32Array;

    constructor(texture: Uint32Array) {
        this.buf8 = new Uint8ClampedArray(texture.buffer, texture.byteOffset, texture.byteLength);
        this.texture = texture;
    }

    clear(bgColor: number) {
        this.texture.fill(bgColor);
    }
}