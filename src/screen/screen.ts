import { Texture } from "../core/textures/texture";
import { Vector2 } from "../core/vector/vector2";
import { IUserInput } from "../user/user-input";

export interface IScreen {
    get tex() : Uint32Array;
    get width() : number;
    get height() : number;
    
    setMouseObserver(observer: IUserInput) : void;
    update() : void;
    paint(texture: Texture, offset: Vector2) : void;
    clear(color: number): void;
}