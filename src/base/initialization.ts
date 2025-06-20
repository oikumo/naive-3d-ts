import { loadBlasModule } from "../core/blas/blas-loader";
import { Application } from "./application/application";
import { ScreenHtml } from "./screen/screen-html";
import { ScreenCanvas } from "./screen/screen-canvas";
import { ScreenTexture } from "./screen/screen-texture";
import { ApplicationContext } from "./application/application-context";
import { GameBase } from "./game/game-base";
import { BlasArrayF32 } from "../core/blas/blas-array";
import { EntityManager } from "./scene/entity-manager";

export async function initialization(game: GameBase) {
    const blas = await loadBlasModule();
    const canvas = document.getElementById("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw Error("Invalid Argument");
    }

    const canvasRenderer = new ScreenCanvas(canvas);
    const canvasSize = canvasRenderer.width * canvasRenderer.height;
    const screenTexture = blas.createSharedArray("SCREEN_TEXTURE", canvasSize);
    const renderTexture = new ScreenTexture(screenTexture.data);
    const screen = new ScreenHtml(canvas, canvasRenderer, renderTexture);
    
    const positions = new BlasArrayF32(blas, 50);
   

    const context = new ApplicationContext(blas, screen, new EntityManager(blas, positions));

    return new Application(game, context);
}