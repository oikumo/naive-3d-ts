import { Blas } from "../../core/blas/blas";
import { BlasArrayF32 } from "../../core/blas/blas-array";
import { Vector3 } from "../../core/types/vector/vector3";

export type createFloat32Array = () => void;

export class EntityManager {
    static readonly #entitySize: number = 3; // Number of float32 values per entity (x, y, z)

    positions: BlasArrayF32;
    #positionTop: number = 0; // Tracks the end of the currently used buffer part, as a direct index.
    blas: Blas;

    get totalCapacity() { return this.positions.length / EntityManager.#entitySize; }
    get count() { return this.#positionTop / EntityManager.#entitySize; }
    get avaliable() { return this.totalCapacity - this.count; }

    constructor(blas: Blas, positions: BlasArrayF32) {
        this.blas = blas;
        this.positions = positions;
    }

    /**
     * Gets the raw Float32Array subarray for an entity.
     * @param entityIndex The index of the entity (0 to count-1).
     * @returns Float32Array subarray or null if index is out of bounds.
     */
    getEntityRawData(entityIndex: number): Float32Array | null {
        if (entityIndex < 0 || entityIndex >= this.count) {
            console.error(`getEntityRawData: entityIndex ${entityIndex} out of bounds. Current count: ${this.count}`);
            return null;
        }
        const baseArrayIndex = entityIndex * EntityManager.#entitySize;
        return this.positions.data.subarray(baseArrayIndex, baseArrayIndex + EntityManager.#entitySize);
    }

    /**
     * Gets the position of an entity as a Vector3.
     * @param entityIndex The index of the entity (0 to count-1).
     * @returns A new Vector3 instance with the entity's position, or null if index is out of bounds.
     */
    getEntityPosition(entityIndex: number): Vector3 | null {
        const data = this.getEntityRawData(entityIndex);
        if (!data) return null;
        return new Vector3(data[0], data[1], data[2]);
    }

    /**
     * Adds a new entity with the given position.
     * @param position The position of the new entity.
     * @returns The index of the newly created entity, or -1 if no space is available.
     */
    addEntity(position: Vector3): number {
        if (this.avaliable <= 0) {
            console.warn("EntityManager: No space available to add new entity.");
            return -1;
        }

        const newEntityIndex = this.count; // Entity index will be the current count
        const baseArrayIndex = this.#positionTop;

        this.positions.data[baseArrayIndex] = position.x;
        this.positions.data[baseArrayIndex + 1] = position.y;
        this.positions.data[baseArrayIndex + 2] = position.z;
        this.#positionTop += EntityManager.#entitySize;

        // TODO: Consider using the WASM function for modification if it provides benefits
        // and if it's intended to be used.
        /*
        const segment = new BlasArrayF32(this.blas, 3); // This creates a new WASM allocation
        segment.data[0] = position.x;
        segment.data[1] = position.y;
        segment.data[2] = position.z;
        this.blas.module.arrayFloat32ModifySegment(
            this.positions.ptr,
            baseArrayIndex, // This should be the starting index in the positions array
            segment.ptr,
            segment.length
        );
        segment.free(); // If BlasArrayF32 has a free method for WASM allocations
        */

        return newEntityIndex;
    }

    /**
     * Sets the position of an existing entity.
     * @param entityIndex The index of the entity.
     * @param position The new position for the entity.
     */
    setEntityPosition(entityIndex: number, position: Vector3): void {
        if (entityIndex < 0 || entityIndex >= this.count) {
            console.error(`setEntityPosition: entityIndex ${entityIndex} out of bounds. Current count: ${this.count}`);
            return;
        }
        const baseArrayIndex = entityIndex * EntityManager.#entitySize;
        this.positions.data[baseArrayIndex] = position.x;
        this.positions.data[baseArrayIndex + 1] = position.y;
        this.positions.data[baseArrayIndex + 2] = position.z;
    }

    /**
     * Translates an existing entity by a given vector.
     * @param entityIndex The index of the entity.
     * @param translation The vector to translate the entity by.
     */
    translateEntity(entityIndex: number, translation: Vector3): void {
        if (entityIndex < 0 || entityIndex >= this.count) {
            console.error(`translateEntity: entityIndex ${entityIndex} out of bounds. Current count: ${this.count}`);
            return;
        }
        const baseArrayIndex = entityIndex * EntityManager.#entitySize;
        this.positions.data[baseArrayIndex] += translation.x;
        this.positions.data[baseArrayIndex + 1] += translation.y;
        this.positions.data[baseArrayIndex + 2] += translation.z;
    }
}