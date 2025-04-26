import { IRenderTexture } from "../render-texture";

export class HTMLCanvasRenderer {
    public width: number;
    public height: number;
    private context2d: CanvasRenderingContext2D | null;
    private imageData: ImageData | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context2d = canvas.getContext("2d");
        
        if (this.context2d != null) {
            this.imageData = this.context2d.createImageData(this.width, this.height);
        }
    }

    draw(renderTexture: IRenderTexture) {
        if (this.imageData == null || this.context2d == null) {
            throw Error("Invalid Params");
        }

        this.imageData.data.set(renderTexture.buf8);
        this.context2d.putImageData(this.imageData, 0, 0);
    }

    imageSize() {
        if (this.imageData == null) {
            return 0;
        }
        return this.imageData.data.length;
    }
}
