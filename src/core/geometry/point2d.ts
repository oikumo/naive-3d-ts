import { Texture } from "../textures/texture";
import { Vector2 } from "../vector/vector2";

export class Point2d {
    position: Vector2;

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    static getPointsOrderedByAsc(points: Array<Point2d>) {
        const cloned = Point2d.cloneList(points);
        cloned.sort((a, b) => { return a.x - b.x; });
        return cloned;
    }

    static translate(point: Point2d, dx: number, dy: number) {
        Vector2.vector2Translate(point.position, dx, dy);
    }

    static fromVector2(vector2: Vector2) {
        return new Point2d(vector2.x, vector2.y);
    }

    static clone(point: Point2d) {
        return new Point2d(point.x, point.y);
    }

    static cloneList(points: Array<Point2d>) {
        if (!points) return [];
        const cloned = new Array(points.length);
        for (let i = points.length - 1; i >= 0; --i) {
            cloned[i] = Point2d.clone(points[i]);

        }
        return cloned;
    }

    static sameX(a: Point2d, b: Point2d) {
        return a.x === b.x;
    }

    static draw(tex: Texture, point: Point2d, color: number) {
        const x = Math.floor(point.x);
        if (x < 0 || x >= tex.width)
            return;

        const y = Math.floor(point.y);
        if (y < 0 || y >= tex.height)
            return;

        tex.pixels[Math.floor(y * tex.width) + x] = color;
    }

    static delta(a: Point2d, b: Point2d) {
        return Point2d.fromVector2(Vector2.vector2Sub(a.position, b.position));
    }

    static distance(a: Point2d, b: Point2d) {
        return Vector2.vector2Distance(a.position, b.position);
    }

    static lerp(a: Point2d, b: Point2d, t: number) {
        return Point2d.fromVector2(Vector2.vector2lerp(a.position, b.position, t));
    }

    static equals(p: Point2d, q: Point2d) {
        return Vector2.vector2AreEquals(p.position, q.position);
    }
}