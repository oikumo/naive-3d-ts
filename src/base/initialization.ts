import { loadBlasModule } from "../core/blas/blas-loader";
import { Application } from "./application/application";
import { ScreenHtml } from "./screen/screen-html";
import { ScreenCanvas } from "./screen/screen-canvas";
import { ScreenTexture } from "./screen/screen-texture";
import { Game } from "../game/game";
import { ApplicationContext } from "./application/application-context";

export async function initialization(game: Game) {
    const blas = await loadBlasModule();
    if (blas === null) throw Error();
    
    const canvas = document.getElementById("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw Error("Invalid Argument");
    }

    const canvasRenderer = new ScreenCanvas(canvas);
    const canvasSize = canvasRenderer.width * canvasRenderer.height;
    const screenTexture = blas.createSharedArray("SCREEN_TEXTURE", canvasSize);
    const renderTexture = new ScreenTexture(screenTexture.data);
    const screen = new ScreenHtml(canvas, canvasRenderer, renderTexture);
    
    const context = new ApplicationContext(blas, screen);

    return new Application(game, context);
}