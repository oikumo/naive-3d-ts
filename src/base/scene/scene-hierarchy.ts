import { GameObject } from './gameobjects/game-object';


export class SceneHierarchy {

    #gameObjects = new Array<GameObject>();

    get gameObjects() { return this.#gameObjects; }

    addGameObject(gameObject: GameObject) {
        this.#gameObjects.push(gameObject);
    }

    removeGameObject(id: string) {
        this.#gameObjects = this.#gameObjects.filter(go => go.id !== id);
    }

    serialize() {
        for (let i = 0; i < this.#gameObjects.length; i++) {
            this.#gameObjects[i].constructor.name;
        }
    }
}
