import { HtmlScreen } from './screen/screen.ts';
import { UserInputLogger } from "./user/user-input-logger.ts";
import { Main } from './main/main.ts';
import { loadBlasModule } from './core/blas/blas-loader.ts';
import { ScreenCanvas } from './screen/screen-canvas.ts';
import { ScreenTexture } from './screen/screen-texture.ts';

async function init() {
    const blas = await loadBlasModule();
    if (blas === null) throw Error();

    blas.testArrays();
    blas.testFunctions();
    blas.testClasses();

    const userInputLogger = new UserInputLogger();
    
    const canvas = document.getElementById("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw Error("Invalid Argument");
    }

    const canvasRenderer = new ScreenCanvas(canvas);
    const canvasSize = canvasRenderer.width * canvasRenderer.height;

    const screenTexture = blas.createSharedArray("SCREEN_TEXTURE", canvasSize);
    const renderTexture = new ScreenTexture(screenTexture.data);

    const screen = new HtmlScreen(canvas, canvasRenderer, renderTexture);
    screen.setMouseObserver(userInputLogger);

    const main = new Main(screen, blas);
    main.run();
}

await init();

  

