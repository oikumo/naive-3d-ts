export class EntityManager {
    #entitySize = 3;
    #positions: Float32Array;
    #positionTop: number = 0;

    constructor(positions: Float32Array) {
        this.#positions = positions;
    }

    addEntity(x: number, y : number, z : number) {
        if (this.#positionTop >= this.#positions.length + this.#entitySize) {
            return -1;
        }
        const entityIndex = this.#positionTop;
        this.#positions[entityIndex] = x;
        this.#positions[entityIndex + 1] = y;
        this.#positions[entityIndex + 2] = z;
        this.#positionTop = entityIndex + 3;

        return entityIndex;
    }

    setEntityPosition(index: number, x: number, y: number, z: number) {
        // TODO Validate args
        this.#positions[index] = x;
        this.#positions[index + 1] = y;
        this.#positions[index + 2] = z;
    }

    translateEntity(index: number, dx: number, dy: number, dz: number) {
        // TODO Validate args
        this.#positions[index] += dx;
        this.#positions[index + 1] += dy;
        this.#positions[index + 2] += dz;
    }
}