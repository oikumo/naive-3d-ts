import { ApplicationContext } from '../../base/application/application-context';
import { GameObject } from './game-object';

export abstract class SceneBase {

    static instance: SceneBase;

    gameObjects = new Array<GameObject>();

    constructor() {
        SceneBase.instance = this;
    }

    abstract setup(context: ApplicationContext) : void;

    abstract start(context: ApplicationContext) : void;

    abstract update(context: ApplicationContext, deltaTime: number) : void;

    abstract render(context: ApplicationContext) : void;


}

export class SceneObject {

    gameObjects = new Array<GameObject>();

    serialize() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].constructor.name;
        }
    }
}