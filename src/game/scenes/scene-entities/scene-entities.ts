import { Color } from "../../../core/colors";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/vector/vector2";
import { SharedArray } from "../../../core/blas/blas-shared-array";

export class SceneEntities implements SceneBase, UserInputBase {
    //#entityManager: EntityManager;
    #mouseLastPosition = new Vector2();
    #cursorTexture: SharedArray<Uint32Array> | null = null;
    #screenTexture: SharedArray<Uint32Array> | null = null;

    constructor() {
        //this.#entityManager = new EntityManager(new Float32Array(1000));
    }

    setup(context: ApplicationContext) {
        context.screen.setMouseObserver(this);
        this.#mouseLastPosition.x = context.screen.width;
        this.#mouseLastPosition.y = context.screen.height;
    }

    start(context: ApplicationContext) {
        this.#cursorTexture = context.blas.createSharedArray("CURSOR", 10000);
        this.#cursorTexture.data.fill(Color.blue);
        this.#screenTexture = context.blas.getArray("SCREEN_TEXTURE");
    }

    update(_context: ApplicationContext, _deltaTime: number) {  
              
    }

    render(context: ApplicationContext) {
        if (this.#cursorTexture !== null && this.#screenTexture !== null) { 
            context.blas.module.drawTexToTex(this.#screenTexture.ptr, context.screen.width,
                this.#cursorTexture.ptr, 100, 100, this.#mouseLastPosition.x - 50, this.#mouseLastPosition.y - 50
            )
        }
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