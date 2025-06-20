import { ApplicationContext } from "../application/application-context";

export abstract class GameBase {

    abstract setup(context: ApplicationContext) : void;

    abstract start(context: ApplicationContext) : void;

    abstract update(context: ApplicationContext, deltaTime: number) : void;

    abstract render(context: ApplicationContext) : void;
}