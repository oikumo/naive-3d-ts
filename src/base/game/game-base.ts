import { ApplicationContext } from "../application/application-context";
import { SceneBase } from "../scene/scene-base";

export abstract class GameBase {

    protected scene: SceneBase | null = null;
    
    getScene() { return this.scene; }

    abstract setup(context: ApplicationContext) : void;

    abstract start(context: ApplicationContext) : void;

    abstract update(context: ApplicationContext, deltaTime: number) : void;

    abstract render(context: ApplicationContext) : void;
}