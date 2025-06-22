import { Transform } from "./transform";

export abstract class GameObject {

    readonly id: string;
    name: string;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }

    transform = new Transform();

    abstract awake() : void;
}