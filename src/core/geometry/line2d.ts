import { ScreenTexture } from "../../screen/screen-texture";
import { Point2d } from "./point2d";

export class Line2d {
    a: Point2d;
    b: Point2d;

    constructor(a: Point2d, b: Point2d) {
        this.a = a;
        this.b = b;
    }

    isPerpendicularToXAxis() {
        return this.a.x - this.b.x === 0;
    }

    slope() {
        if (this.isPerpendicularToXAxis()) return null;
        const delta = Point2d.delta(this.b, this.a);
        return delta.y / delta.x;
    }

    getXfromY(y: number) {
        const slope = this.slope();
        if (!slope) return null;
        return this.a.position.x + ((y - this.a.position.y) / slope);
    }

    static equals(line1: Line2d, line2: Line2d) {
        return Point2d.equals(line1.a, line2.a) && Point2d.equals(line1.b, line2.b);
    }

    static draw(tex: ScreenTexture, width: number, height: number, p: Point2d, q: Point2d, color: number) {
        const delta = Point2d.delta(q, p);
        const n = Math.max(Math.abs(delta.x), Math.abs(delta.y));
        
        //const px = Math.floor(p.x);
        //const py = Math.floor(p.y);
        
        let i, t, x, y;
        
        for (i = n - 1; i > 0; --i) {
            t = i / n;

            x = Math.floor(p.x + (t * delta.x));
            if (x < 0 || x >= width)
                continue;

            y = Math.floor(p.y) + Math.floor(t * delta.y);
            if (y < 0 || y >= height)
                continue;

            tex.texture[Math.floor(y * width) + x] = color;
        }
    }
}
