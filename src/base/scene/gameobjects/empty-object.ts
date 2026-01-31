import { GameObject } from "./game-object";

export class EmptyObject extends GameObject {
    override awake(): void {
        // Nothing to initialize
    }
}
