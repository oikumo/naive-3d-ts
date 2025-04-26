export interface IRenderTexture {
    buf8: Uint8ClampedArray;
    texture: Uint32Array;
    clear(bgColor: number): void;
}