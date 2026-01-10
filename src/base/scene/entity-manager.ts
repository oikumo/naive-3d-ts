import { Blas } from "../../core/blas/blas";
import { BlasArrayF32 } from "../../core/blas/blas-array";

export type createFloat32Array = () => void;

export class EntityManager {
    static readonly #entitySize: number = 3;

    positions: BlasArrayF32;
    #positionTop: number = 0;
    blas: Blas;

    get totalCapacity() { return this.positions.length / EntityManager.#entitySize; }

    get avaliable() { return this.totalCapacity - this.#positionTop; }

    constructor(blas: Blas, positions: BlasArrayF32) {
        this.blas = blas;
        this.positions = positions;
    }


    getEntity(entityID: number) {
        return this.positions.data.subarray(entityID, entityID + 3);
    }



    addEntity(x: number, y: number, z: number) {
        if (this.avaliable <= 0) {
            return -1;
        }

        const entityIndex = this.#positionTop;
        this.positions.data[entityIndex] = x;
        this.positions.data[entityIndex + 1] = y;
        this.positions.data[entityIndex + 2] = z;
        this.#positionTop += EntityManager.#entitySize;

        return entityIndex;
    }

    setEntityPosition(index: number, x: number, y: number, z: number) {
        if (index < 0 || index >= this.positions.length - 2) {
            throw new Error(`Invalid entity index: ${index}`);
        }
        this.positions.data[index] = x;
        this.positions.data[index + 1] = y;
        this.positions.data[index + 2] = z;
    }

    translateEntity(index: number, dx: number, dy: number, dz: number) {
        if (index < 0 || index >= this.positions.length - 2) {
            throw new Error(`Invalid entity index: ${index}`);
        }
        this.positions.data[index] += dx;
        this.positions.data[index + 1] += dy;
        this.positions.data[index + 2] += dz;
    }
}