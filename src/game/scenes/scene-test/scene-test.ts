import { Color } from "../../../core/colors";
import { Line2d } from "../../../core/geometry/line2d";
import { Point2d } from "../../../core/geometry/point2d";
import { Texture } from "../../../core/textures/texture";
import { Vector2 } from "../../../core/vector/vector2";
import { ApplicationContext } from '../../../base/application/application-context';
import { SceneBase } from "../../../base/scene/scene-base";

export class SceneTest implements SceneBase {
    tex: Texture;
    texCenter: Vector2;
    lines: Array<Line2d>;
    shape: Array<Line2d>;

    constructor() {
        this.tex = new Texture(320, 320);
        this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 };
        this.lines = new Array<Line2d>();
        this.shape = new Array<Line2d>();
    }

    start(context: ApplicationContext) {
        
        context.screen.clearColor = Color.black;
        this.tex.fill(() => Color.blue);   

        const a = new Point2d(0, 0);
        const b = new Point2d(0.5, Math.sin(1.04));
        const c = new Point2d(1, 0);

        Point2d.scale(a, 100);
        Point2d.scale(b, 100);
        Point2d.scale(c, 100);

        // TODO Implement Triangle with vector
        //const v = new Vector(new Uint32Array([
        //    0, 0, 0.5, Math.sin(1.04), 1, 0 
        //]));
        
        this.shape.push(
            new Line2d(a, b),
            new Line2d(b, c),
            new Line2d(c, a)
        );
    }
    

    update(context: ApplicationContext, deltaTime: number) {
        const speed = 0.05 * deltaTime;
        for (let s of this.shape) {
            Point2d.translate(s.a, speed * 0.1, speed * 0.1);
            Point2d.translate(s.b, speed * 0.1, speed * 0.1);
        }

        this.tex.fill((x, y) => { 
            return (x + y > 100) ? Math.random() * Color.blue : Color.yellow;
        });

    }

    render(context: ApplicationContext) {
        this.tex.draw(context.screen.renderTexture, context.screen.width, this.texCenter.x, this.texCenter.y);

        this.shape.forEach((line) => {
            Line2d.draw(context.screen.renderTexture, context.screen.width, context.screen.height, line.a, line.b, Color.green);
        });

        const array = context.blas.sharedArrays.get("SCREEN_TEXTURE");
        if (array) {
            context.blas.blas.multiply(1    , array.ptr, array.length);
        }
        
        //this.lines.forEach((line) => {
        //    Line2d.draw(this.#screen.renderTexture, screen.width, screen.height, line.a, line.b, Color.red);
        //});
    }
}