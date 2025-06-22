import { GameObject } from "../base/scene/gameobjects/game-object";

export class Player extends GameObject {
    
    override awake(): void {
        console.log('player name: ' + this.name);
    }   
}