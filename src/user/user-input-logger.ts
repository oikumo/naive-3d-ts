import { IUserInput } from "./user-input";

export class UserInputLogger implements IUserInput {

    onActionUp(x: number, y: number) {
        console.log(`Target onActionUp: ${x}, ${y}`);
    }

    onMove(x: number, y: number) {
        console.log(`Target onMove: ${x}, ${y}`);
    }

    onActionDown(x: number, y: number) {
        console.log(`Target onActionDown: ${x}, ${y}`);
    }
}
