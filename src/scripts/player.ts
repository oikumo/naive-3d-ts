import { GameObject } from "../base/scene/game-object";

export class Player extends GameObject {
    
    override awake(): void {
        console.log('player');
    }   
}