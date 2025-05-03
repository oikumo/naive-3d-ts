import { IUserInput } from "./user-input";

export class HTMLUserEvents {
    private target: IUserInput | null = null;

    setTarget(target: IUserInput | null) { 
        this.target = target; 
    }

    constructor(target: IUserInput | null = null){
        this.target = target;
    }

    register(canvas: HTMLCanvasElement) {
        canvas.onmousemove = this.onMove.bind(this);
        canvas.onmousedown = this.onActionDown.bind(this);
        canvas.onmouseup = this.onActionUp.bind(this);
    }

    onMove(event: MouseEvent) {
        if (this.target === null) return;
        this.target.onMove(event.x, event.y);
    }
    
    onActionDown(event: MouseEvent) {
        if (this.target === null) return;
        this.target.onActionDown(event.x, event.y);
    }

    onActionUp(event: MouseEvent) {
        if (this.target === null) return;
        this.target.onActionUp(event.x, event.y);
    }

    removeObservers() {
        this.target = null;
    }
}