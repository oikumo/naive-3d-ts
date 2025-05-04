import { Color } from "../../../core/colors";
import { Texture } from "../../../core/textures/texture";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { EntityManager } from "../../../base/scene/entity-manager";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/vector/vector2";

export class SceneEntities implements SceneBase, UserInputBase {
    #tex: Texture;
    #entityManager: EntityManager;
    #cursor = -1;
    #mouseDeltaPosition = new Vector2();
    #mouseLastPosition = new Vector2();

    constructor() {
        this.#entityManager = new EntityManager(new Float32Array(1000));
        this.#tex = new Texture(100, 100);
    }
    start(context: ApplicationContext) {
        this.#mouseLastPosition.x = context.screen.width;
        this.#mouseLastPosition.y = context.screen.height;
        
        context.screen.setMouseObserver(this);
        context.screen.clearColor = Color.black;
        this.#tex.fill(() => Color.blue);   

        this.#cursor = this.#entityManager.addEntity(0,0,0);
    }

    update(context: ApplicationContext, deltaTime: number) {
        const speed = 0.000001 * deltaTime;
        /*
        this.#entityManager.translateEntity(this.#cursor,
            this.#mouseLastPosition.x,
            this.#mouseLastPosition.y,
            0
        )*/
    }

    render(context: ApplicationContext) {
        this.#tex.draw(context.screen.renderTexture, context.screen.width,
            this.#mouseLastPosition.x, this.#mouseLastPosition.y
        );
    }

    onActionUp(_x: number, _y: number): void {
    }

    onMove(x: number, y: number): void {
        this.#mouseDeltaPosition.x = x;
        this.#mouseDeltaPosition.y = y;
        this.#mouseLastPosition.x = x;
        this.#mouseLastPosition.y = y;
    }

    onActionDown(_x: number, _y: number): void {
    }
}