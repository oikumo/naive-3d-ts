export class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Static methods for operations that create new vectors
    static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static multiplyScalar(vec: Vector3, scalar: number): Vector3 {
        return new Vector3(vec.x * scalar, vec.y * scalar, vec.z * scalar);
    }

    static dot(a: Vector3, b: Vector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static cross(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    static distanceSquared(a: Vector3, b: Vector3): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }

    static distance(a: Vector3, b: Vector3): number {
        return Math.sqrt(Vector3.distanceSquared(a, b));
    }

    static lerp(start: Vector3, end: Vector3, t: number): Vector3 {
        t = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1]
        return new Vector3(
            start.x + (end.x - start.x) * t,
            start.y + (end.y - start.y) * t,
            start.z + (end.z - start.z) * t
        );
    }

    static zero(): Vector3 { return new Vector3(0, 0, 0); }
    static one(): Vector3 { return new Vector3(1, 1, 1); }
    static up(): Vector3 { return new Vector3(0, 1, 0); }
    static down(): Vector3 { return new Vector3(0, -1, 0); }
    static left(): Vector3 { return new Vector3(-1, 0, 0); }
    static right(): Vector3 { return new Vector3(1, 0, 0); }
    static forward(): Vector3 { return new Vector3(0, 0, 1); } // Assuming Z is forward
    static backward(): Vector3 { return new Vector3(0, 0, -1); }


    // Instance methods
    public set(x: number, y: number, z: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    public add(other: Vector3): this {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    public subtract(other: Vector3): this {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    public normalize(): this {
        const len = this.length();
        if (len > 0.00001) { // Epsilon check to avoid division by zero
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
        return this;
    }

    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public equals(other: Vector3, epsilon: number = 0.00001): boolean {
        return (
            Math.abs(this.x - other.x) < epsilon &&
            Math.abs(this.y - other.y) < epsilon &&
            Math.abs(this.z - other.z) < epsilon
        );
    }

    public toString(): string {
        return `Vector3(${this.x}, ${this.y}, ${this.z})`;
    }
}
