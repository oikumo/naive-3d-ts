import { Color } from "../../../core/colors";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/types/vector/vector2";
import { BlasArrayUint32 } from "../../../core/blas/blas-array";

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
        const halfCursor = SimpleScene.CURSOR_SIZE / 2;
        const halfBlock = SimpleScene.BLOCKS_SIZE / 2;

        for (const gameObject of this.hierarchy.gameObjects) {
            context.blas.module.drawTexToTex(
                this.#screenTexture.ptr,
                screenWidth,
                this.#blocksTexture.ptr,
                SimpleScene.BLOCKS_SIZE,
                SimpleScene.BLOCKS_SIZE,
                gameObject.transform.position.x - halfBlock,
                gameObject.transform.position.y - halfBlock
            );
        }

        context.blas.module.drawTexToTex(
            this.#screenTexture.ptr,
            screenWidth,
            this.#cursorTexture.ptr,
            SimpleScene.CURSOR_SIZE,
            SimpleScene.CURSOR_SIZE,
            this.#mouseLastPosition.x - halfCursor,
            this.#mouseLastPosition.y - halfCursor
        );
    }

    onActionUp(_x: number, _y: number): void {
    }

    onMove(x: number, y: number): void {
        this.#mouseLastPosition.x = x;
        this.#mouseLastPosition.y = y;
    }

    onActionDown(_x: number, _y: number): void {
    }
}