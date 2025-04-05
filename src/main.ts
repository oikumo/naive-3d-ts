import './style.css'
import { N3Canvas } from './screen/screen.ts';
import { Color } from './common/colors.ts';


function main() {
  const htmlCanvas = document.getElementById("canvas");
  if (!(htmlCanvas instanceof HTMLCanvasElement)) {
    return;
  }

  const screen = new N3Canvas(htmlCanvas);
  
  let t = 0;

  setInterval(() => {
    screen.clear(Color.black + t);
    t += 1;
    screen.draw();
    console.log("hola");
  },10);
  
}

main();
