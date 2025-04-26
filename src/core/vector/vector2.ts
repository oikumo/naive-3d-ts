export class Vector2 {
    x: number;
    y: number;

    constructor (x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static vector2Left() {
        return new Vector2(1.0, 0.0);
    }
    
    static vector2Right() {
        return new Vector2(0.0, 1.0);
    }
    
    static vector2Zero() {
        return new Vector2(0, 0);
    }
    
    static vector2AreEquals(v1: Vector2, v2: Vector2) {
        return v1.x === v2.x && v1.y === v2.y;
    }

    static vector2Translate(v: Vector2, dx: number, dy: number) {
        v.x += dx;
        v.y += dy;
    }
    
    static vector2lerp(v: Vector2, target: Vector2, t = 1) {
        const result = Vector2.vector2Zero();
        result.x = t * (target.x - v.x) + v.x;
        result.x = t * (target.y - v.y) + v.y;
        
        return result;
    }
    
    static vector2Scale(v: Vector2, factor: number) {
        v.x *= factor;
        v.y *= factor;
    }
    
    static vector2Sub(v1: Vector2, v2: Vector2) {
        return new Vector2(
            v1.x - v2.x,
            v1.y - v2.y
        );
    }
    
    static vector2Distance(v1: Vector2, v2: Vector2) {
        const diff = Vector2.vector2Sub(v1, v2);
        return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
    }
    
}
