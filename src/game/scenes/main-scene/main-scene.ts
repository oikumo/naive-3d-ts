import { Color } from "../../../core/colors";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";
import { UserInputBase } from "../../../base/user/user-input-base";
import { Vector2 } from "../../../core/types/vector/vector2";
import { Vector3 } from "../../../core/types/vector/vector3"; // Import Vector3
import { BlasArrayF32, BlasArrayUint32 } from "../../../core/blas/blas-array";
import { EntityManager } from "../../../base/scene/entity-manager";
import { Player } from "../../../scripts/player";

export class MainScene extends SceneBase implements UserInputBase {
    #mouseLastPosition = new Vector2();
    #cursorTexture: BlasArrayUint32 | null = null;
    #screenTexture: BlasArrayUint32 | null = null;
    entityManager: EntityManager | null = null;
    entityElementTexture: BlasArrayUint32 | null = null; // Renamed for clarity


    override setup(context: ApplicationContext) {
        context.screen.setMouseObserver(this);
        this.#mouseLastPosition.x = context.screen.width / 2;
        this.#mouseLastPosition.y = context.screen.height / 2;
    }

    override start(context: ApplicationContext) {
        this.entityElementTexture = context.blas.createSharedArray("ELEMENT-1", 10000);
        if (this.entityElementTexture) {
            this.entityElementTexture.data.fill(Color.blue);
        }

        this.#cursorTexture = context.blas.createSharedArray("CURSOR", 10000);
        if (this.#cursorTexture) {
            this.#cursorTexture.data.fill(Color.green);
        }

        // Allocate space for more entities, e.g., 10 entities * 3 floats/entity = 30 floats
        this.entityManager = new EntityManager(context.blas, new BlasArrayF32(context.blas, 3 * 10));

        this.#screenTexture = context.blas.getArray("SCREEN_TEXTURE");

        // Add initial entity using Vector3
        this.entityManager.addEntity(new Vector3(10, 10, 0));
    }

    override update(_context: ApplicationContext, deltaTime: number) {
        // console.log(`gameobjects: ${this.gameObjects.length}`); // GameObject system not fully active yet

        if (this.entityManager === null || this.entityManager.count === 0) return;

        const speed = deltaTime * 10;
        // Translate the first entity (index 0)
        this.entityManager.translateEntity(0, new Vector3(speed, speed, 0));
    }

    frameCount = 0; // Renamed from count to avoid conflict with entityManager.count
    entitySpawnOffset = 0; // Renamed from offset

    override render(context: ApplicationContext) {
        if (!this.entityManager || !this.entityElementTexture || !this.#cursorTexture || !this.#screenTexture || this.entityManager.count === 0) {
            return;
        }
        
        context.screen.clearColor = Color.black;
        context.screen.clear();

        // Spawn new entities periodically
        if (this.frameCount === 200) {
            this.entityManager.addEntity(new Vector3(this.entitySpawnOffset, this.entitySpawnOffset, this.entitySpawnOffset));
            this.entitySpawnOffset++;
            this.frameCount = 0;
        }
        this.frameCount++;

        // Render all entities
        for (let i = 0; i < this.entityManager.count; i++) {
            const position = this.entityManager.getEntityPosition(i);
            if (position && this.#screenTexture && this.entityElementTexture) {
                context.blas.module.drawTexToTex(
                    this.#screenTexture.ptr, context.screen.width,
                    this.entityElementTexture.ptr, 100, 100, // Assuming texture size is 100x100
                    Math.floor(position.x) + 50, // Offset to center the 100x100 texture
                    Math.floor(position.y) + 50  // Offset to center the 100x100 texture
                );
            }
        }
        
        // Render cursor
        if (this.#screenTexture && this.#cursorTexture) {
            context.blas.module.drawTexToTex(
                this.#screenTexture.ptr, context.screen.width,
                this.#cursorTexture.ptr, 100, 100, // Assuming cursor texture size is 100x100
                this.#mouseLastPosition.x - 50, // Center cursor
                this.#mouseLastPosition.y - 50  // Center cursor
            );
        }
    }

    onActionUp(_x: number, _y: number): void {
        // GameObjects are not fully integrated into update/render loop yet.
        // For now, just logging or simple interaction.
        const newPlayer = new Player();
        this.gameObjects.push(newPlayer);
        // If GameObject lifecycle (awake, update, render) was implemented in SceneBase,
        // you would call something like: this.addGameObject(newPlayer, context);
        console.log("Player object created and added to gameObjects list.");
    }

    onMove(x: number, y: number): void {
        this.#mouseLastPosition.x = x;
        this.#mouseLastPosition.y = y;
    }

    onActionDown(_x: number, _y: number): void {
        // Not used currently
    }
}