import { ScreenTexture } from "./screen-texture";
import { ScreenCanvas } from "./screen-canvas";
import { HTMLUserEvents } from "../user/user-events";
import { IUserInput } from "../user/user-input";
import { Color } from "../common/colors";

export class HtmlScreen {
    private canvasRenderer: ScreenCanvas;
    private renderTexure: ScreenTexture;
    private userEvents: HTMLUserEvents;
    #clearColor: number = Color.black;

    constructor(canvas: HTMLCanvasElement, canvasRenderer: ScreenCanvas, renderTexture: ScreenTexture) {
        this.canvasRenderer = canvasRenderer;
        this.renderTexure = renderTexture;
        this.userEvents = new HTMLUserEvents();
        this.userEvents.register(canvas);        
    }

    update() {
        this.canvasRenderer.draw(this.renderTexure);
    }

    clear() {
        this.renderTexure.clear(this.#clearColor);
    }
    
    setMouseObserver(observer: IUserInput) {
        this.userEvents.setTarget(observer);
    }

    get renderTexture() { return this.renderTexure; }

    get width() { return this.canvasRenderer.width; }

    get height() { return this.canvasRenderer.height; }

    set clearColor(color: number) { this.#clearColor = color; }
}
