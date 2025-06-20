import { Blas } from "../../core/blas/blas";
import { BlasArrayF32 } from "../../core/blas/blas-array";

export type createFloat32Array = () => void; 

export class EntityManager {
    static readonly #entitySize : number = 3;

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



    addEntity(_x: number, _y : number, _z : number) {
        if (this.avaliable <= 0) {
            return -1;
        }

        const entityIndex = this.#positionTop;
        this.positions.data[entityIndex] = 1;
        this.positions.data[entityIndex + 1] = 2;
        this.positions.data[entityIndex+ 2] = 3;
        this.#positionTop = entityIndex + 3;
        /*

        const segment = new BlasArrayF32(this.blas, 3);
        segment.data[0] = x;
        segment.data[1] = y;
        segment.data[2] = z;

  
        this.blas.module.arrayFloat32ModifySegment(
            this.positions.ptr, 
            entityIndex, 
            segment.ptr, 
            segment.length);
*/


        return entityIndex;
    }

    setEntityPosition(index: number, x: number, y: number, z: number) {
        // TODO Validate args
        this.positions.data[index] = x;
        this.positions.data[index + 1] = y;
        this.positions.data[index + 2] = z;
    }

    translateEntity(index: number, dx: number, dy: number, dz: number) {
        // TODO Validate args
        this.positions.data[index] += dx;
        this.positions.data[index + 1] += dy;
        this.positions.data[index + 2] += dz;
    }
}