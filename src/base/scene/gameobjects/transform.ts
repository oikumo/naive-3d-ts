import { Vector2 } from "../../../core/types/vector/vector2";

export class Transform {

    position: Vector2;
    rotation: number = 0;
    scale: Vector2;

    constructor() {
        this.position = new Vector2();
        this.scale = new Vector2(1, 1);
    }
    children = new Array<Transform>();
}