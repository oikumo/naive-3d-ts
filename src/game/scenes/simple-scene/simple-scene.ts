import { Color } from "../../../core/colors";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/types/vector/vector2";
import { BlasArrayUint32 } from "../../../core/blas/blas-array";
import { Editor } from "../../../editor/editor";

export class SimpleScene extends SceneBase implements UserInputBase {
    static readonly CURSOR_SIZE = 100;
    static readonly BLOCKS_SIZE = 100;
    static readonly TEXTURE_CAPACITY = 10000;

    #mouseLastPosition = new Vector2();
    #cursorTexture: BlasArrayUint32 | null = null;
    #screenTexture: BlasArrayUint32 | null = null;
    #blocksTexture: BlasArrayUint32 | null = null;

    constructor() {
        super('Simple Scene');
    }

    override setup(context: ApplicationContext) {
        context.screen.setMouseObserver(this);
        this.#mouseLastPosition.x = context.screen.width / 2;
        this.#mouseLastPosition.y = context.screen.height / 2;
    }

    override start(context: ApplicationContext) {
        this.#cursorTexture = context.blas.createSharedArray("CURSOR", SimpleScene.TEXTURE_CAPACITY);
        this.#cursorTexture.data.fill(Color.green);

        this.#blocksTexture = context.blas.createSharedArray("BLOCKS", SimpleScene.TEXTURE_CAPACITY);
        this.#blocksTexture.data.fill(Color.blue);

        this.#screenTexture = context.blas.getArray("SCREEN_TEXTURE");
    }

    override update(_context: ApplicationContext, _deltaTime: number) {
    }


    override render(context: ApplicationContext) {
        if (this.#cursorTexture === null || this.#screenTexture === null || this.#blocksTexture === null) return;

        context.screen.clearColor = Color.black;
        context.screen.clear();

        const screenWidth = context.screen.width;
        const screenHeight = context.screen.height;
        const halfCursor = SimpleScene.CURSOR_SIZE / 2;
        const halfBlock = SimpleScene.BLOCKS_SIZE / 2;

        for (const gameObject of this.hierarchy.gameObjects) {
            const x = Math.max(0, Math.min(gameObject.transform.position.x - halfBlock, screenWidth - SimpleScene.BLOCKS_SIZE));
            const y = Math.max(0, Math.min(gameObject.transform.position.y - halfBlock, screenHeight - SimpleScene.BLOCKS_SIZE));

            context.blas.module.drawTexToTex(
                this.#screenTexture.ptr,
                screenWidth,
                this.#blocksTexture.ptr,
                SimpleScene.BLOCKS_SIZE,
                SimpleScene.BLOCKS_SIZE,
                x,
                y
            );
        }

        const cursorX = Math.max(0, Math.min(this.#mouseLastPosition.x - halfCursor, screenWidth - SimpleScene.CURSOR_SIZE));
        const cursorY = Math.max(0, Math.min(this.#mouseLastPosition.y - halfCursor, screenHeight - SimpleScene.CURSOR_SIZE));

        context.blas.module.drawTexToTex(
            this.#screenTexture.ptr,
            screenWidth,
            this.#cursorTexture.ptr,
            SimpleScene.CURSOR_SIZE,
            SimpleScene.CURSOR_SIZE,
            cursorX,
            cursorY
        );
    }

    onActionUp(_x: number, _y: number): void {
        Editor.instance.handleMouseUp();
    }

    onMove(x: number, y: number): void {
        this.#mouseLastPosition.x = x;
        this.#mouseLastPosition.y = y;
        Editor.instance.handleMouseMove(x, y);
    }

    onActionDown(x: number, y: number): void {
        Editor.instance.handleMouseDown(x, y);
    }
}