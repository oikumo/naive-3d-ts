import { UserInputBase } from "../../base/user/user-input-base";
import { Game } from "../game";

export class UserInputLogger implements UserInputBase {
    
    #game: Game;

    constructor(game: Game) {
        this.#game = game;
    }

    onActionUp(_x: number, _y: number) {
        this.#game.switchScenes();
    }

    onMove(_x: number, _y: number) {
    }

    onActionDown(_x: number, _y: number) {
    }
}
