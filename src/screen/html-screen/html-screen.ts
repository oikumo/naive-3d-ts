import { HTMLRenderTexture } from "./html-render-texture";
import { HTMLCanvasRenderer } from "./html-canvas-renderer";
import { Texture } from "../../core/textures/texture";
import { Vector2 } from "../../core/vector/vector2";
import { IScreen } from "../screen";
import { HTMLUserEvents } from "./html-user-events";
import { IUserInput } from "../../user/user-input";

export class HtmlScreen implements IScreen {
    private canvasRenderer: HTMLCanvasRenderer;
    private renderTexure: HTMLRenderTexture;
    private userEvents: HTMLUserEvents;
    private canvas: HTMLCanvasElement | null = null;

    constructor() {
        const canvas = document.getElementById("canvas");
        if (!(canvas instanceof HTMLCanvasElement)) {
          throw Error("Invalid Argument");
        }
        this.canvas = canvas;
        this.canvasRenderer = new HTMLCanvasRenderer(this.canvas);
        this.renderTexure = new HTMLRenderTexture(this.canvasRenderer.width, this.canvasRenderer.height);
        this.userEvents = new HTMLUserEvents();
        this.userEvents.register(canvas);        
    }
    
    setMouseObserver(observer: IUserInput) {
        this.userEvents.setTarget(observer);
    }

    get tex() {
        return this.renderTexure.texture;
    }

    get width() {
        return this.canvasRenderer.width;
    }

    get height() {
        return this.canvasRenderer.height;
    }

    update() {
        this.canvasRenderer.draw(this.renderTexure);
    }

    paint(texture: Texture, offset: Vector2) {
        texture.paintTo(this.renderTexure.texture, this.width, offset.x, offset.y);
    }

    clear(color: number) {
        this.renderTexure.clear(color);
    }
}