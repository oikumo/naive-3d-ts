import { ApplicationContext } from "../application/application-context";

export interface GameBase {

    setup(context: ApplicationContext) : void;

    start(context: ApplicationContext) : void;

    update(context: ApplicationContext, deltaTime: number) : void;

    render(context: ApplicationContext) : void;
}