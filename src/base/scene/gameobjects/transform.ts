import { Vector2 } from "../../../core/types/vector/vector2";

export class Transform {

    position: Vector2;

    constructor() {
        this.position = new Vector2();
    }
    children = new Array<Transform>();
}