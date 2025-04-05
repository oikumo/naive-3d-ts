import { RenderTexture } from "./render-texture";
import { CanvasRenderer } from "./renderer";

export class N3Canvas {

    public canvas: HTMLCanvasElement;
    private canvasRenderer: CanvasRenderer;
    private renderTex: RenderTexture;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasRenderer = new CanvasRenderer(canvas);
        this.renderTex = new RenderTexture(this.canvasRenderer.width, this.canvasRenderer.height);
    }

    get tex() {
        return this.renderTex.texture;
    }

    get width() {
        return this.canvasRenderer.width;
    }

    get height() {
        return this.canvasRenderer.height;
    }

    draw() {
        this.canvasRenderer.draw(this.renderTex.buf8);
    }

    clear(color: number) {
        this.renderTex.clear(color);
    }
}