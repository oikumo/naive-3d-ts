import { Color } from "../../../core/colors";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/types/vector/vector2";
import { BlasArrayF32, BlasArrayUint32 } from "../../../core/blas/blas-array";
import { EntityManager } from "../../../base/scene/entity-manager";

export class MainScene implements SceneBase, UserInputBase {
    #mouseLastPosition = new Vector2();
    #cursorTexture: BlasArrayUint32 | null = null;
    #screenTexture: BlasArrayUint32 | null = null;

    entity : BlasArrayUint32| null = null;


    setup(context: ApplicationContext) {
        context.screen.setMouseObserver(this);
        this.#mouseLastPosition.x = context.screen.width / 2;
        this.#mouseLastPosition.y = context.screen.height / 2;
    }

    entityManager: EntityManager | null = null;

    start(context: ApplicationContext) {
    
        this.entity = context.blas.createSharedArray("ELEMENT-1", 10000);
        this.entity.data.fill(Color.blue);

        this.#cursorTexture = context.blas.createSharedArray("CURSOR", 10000);
        this.#cursorTexture.data.fill(Color.green);

        this.entityManager = new EntityManager(context.blas, new BlasArrayF32(context.blas, 100));

        this.#screenTexture = context.blas.getArray("SCREEN_TEXTURE");

        this.entityManager.addEntity(10, 10, 0);
    }

    update(_context: ApplicationContext, deltaTime: number) { 
        if (this.entityManager === null) return;
        const speed =  deltaTime * 10;
        this.entityManager.translateEntity(0, speed, speed, 0);
    }

    
    count = 0;
    offset = 0;

    render(context: ApplicationContext) {
        if (this.entityManager === null || this.entity === null || this.#cursorTexture === null || this.#screenTexture === null) return;
        context.screen.clearColor = Color.black;
        context.screen.clear();
        
        if (this.count === 200){
            this.entityManager.addEntity(this.offset, this.offset, this.offset);
            this.offset++;
            this.count = 0;
        }

        this.count++;
        

        const position = this.entityManager.getEntity(0);

        context.blas.module.drawTexToTex(this.#screenTexture.ptr, context.screen.width,
            this.entity.ptr, 100, 100, 
            Math.floor(position[0]) + 50, 
            Math.floor(position[1]) + 50
        );
        
        context.blas.module.drawTexToTex(this.#screenTexture.ptr, context.screen.width,
            this.#cursorTexture.ptr, 100, 100, this.#mouseLastPosition.x - 50, this.#mouseLastPosition.y - 50);
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