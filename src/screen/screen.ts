import { IUserInput } from "../user/user-input";
import { IRenderTexture } from "./render-texture";

export interface IScreen {
    update() : void;
    clear() : void;   
    setMouseObserver(observer: IUserInput) : void;
    get renderTexture() : IRenderTexture;
    get width() : number;
    get height() : number;
    set clearColor(color: number);
}