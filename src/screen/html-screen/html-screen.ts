import { HTMLRenderTexture } from "./html-render-texture";
import { HTMLCanvasRenderer } from "./html-canvas-renderer";
import { IScreen } from "../screen";
import { HTMLUserEvents } from "./html-user-events";
import { IUserInput } from "../../user/user-input";
import { Color } from "../../common/colors";

export class HtmlScreen implements IScreen {
    private canvasRenderer: HTMLCanvasRenderer;
    private renderTexure: HTMLRenderTexture;
    private userEvents: HTMLUserEvents;
    private canvas: HTMLCanvasElement | null = null;
    #clearColor: number = Color.black;

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