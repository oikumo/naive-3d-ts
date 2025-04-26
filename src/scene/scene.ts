import { Color } from "../common/colors";
import { Line2d } from "../core/geometry/line2d";
import { Point2d } from "../core/geometry/point2d";
import { Texture } from "../core/textures/texture";
import { Vector2 } from "../core/vector/vector2";
import { IScreen } from "../screen/screen";

export class Scene {
    #screen: IScreen;
    tex: Texture;
    texCenter: Vector2;
    lines: Array<Line2d>;

    constructor(screen: IScreen) {
        this.#screen = screen;
        this.tex = new Texture(320, 320);
        this.texCenter = { x: this.tex.width / 2, y: this.tex.height / 2 };
        this.lines = new Array<Line2d>();
    }

    start() {
        this.#screen.clearColor = Color.black;
        this.tex.fill(() => Color.blue);   
        const center = new Point2d(50, 50);
        
        this.lines= [
            new Line2d(new Point2d(10, 10), center),
            new Line2d(new Point2d(10, 50), center),
            new Line2d(new Point2d(20, 100), center),
            new Line2d(new Point2d(30, 150), center)
        ];
    }

    update(deltaTime: number) {
        this.texCenter.x += deltaTime * 0.01;
        this.texCenter.y += deltaTime * 0.01;
    }

    render() {
        this.lines.forEach((line) => {
            Line2d.draw(this.#screen.renderTexture, screen.width, screen.height, line.a, line.b, Color.red);
        });

        this.tex.draw(this.#screen.renderTexture, this.#screen.width, this.texCenter.x, this.texCenter.y);
    }
}