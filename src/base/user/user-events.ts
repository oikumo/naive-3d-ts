import { UserInputBase } from "./user-input-base";

export class UserEvents {
    
    #target: UserInputBase | null = null;

    constructor(target: UserInputBase | null = null){
        this.#target = target;
    }
    
    setTarget(target: UserInputBase | null) { 
        this.#target = target; 
    }

    register(canvas: HTMLCanvasElement) {
        canvas.onmousemove = this.onMove.bind(this);
        canvas.onmousedown = this.onActionDown.bind(this);
        canvas.onmouseup = this.onActionUp.bind(this);
    }

    onMove(event: MouseEvent) {
        if (this.#target === null) return;
        this.#target.onMove(event.x, event.y);
    }
    
    onActionDown(event: MouseEvent) {
        if (this.#target === null) return;
        this.#target.onActionDown(event.x, event.y);
    }

    onActionUp(event: MouseEvent) {
        if (this.#target === null) return;
        this.#target.onActionUp(event.x, event.y);
    }

    removeObservers() {
        this.#target = null;
    }
}