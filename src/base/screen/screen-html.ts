import { ScreenTexture } from "./screen-texture";
import { ScreenCanvas } from "./screen-canvas";
import { UserEvents } from "../user/user-events";
import { UserInputBase } from "../user/user-input-base";
import { Color } from "../../core/colors";

export class ScreenHtml {
    private canvasRenderer: ScreenCanvas;
    private renderTexure: ScreenTexture;
    private userEvents: UserEvents;
    #clearColor: number = Color.black;

    constructor(canvas: HTMLCanvasElement, canvasRenderer: ScreenCanvas, renderTexture: ScreenTexture) {
        this.canvasRenderer = canvasRenderer;
        this.renderTexure = renderTexture;
        this.userEvents = new UserEvents();
        this.userEvents.register(canvas);        
    }

    update() {
        this.canvasRenderer.draw(this.renderTexure);
    }

    clear() {
        this.renderTexure.clear(this.#clearColor);
    }
    
    setMouseObserver(observer: UserInputBase) {
        this.userEvents.setTarget(observer);
    }

    get renderTexture() { return this.renderTexure; }

    get width() { return this.canvasRenderer.width; }

    get height() { return this.canvasRenderer.height; }

    set clearColor(color: number) { this.#clearColor = color; }
}
