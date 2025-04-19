import { N3Canvas } from './screen/screen.ts';
import { Color } from './common/colors.ts';
import * as wasm from "./mainx/mainx.wasm";

/*
import init from './main.wasm?init'

init().then((instance) => {
  const { d } = instance.exports;
  console.log(d(9));
})
*/

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
    console.log(wasm.int_sqrt(16));

  },10);
  
}

main();
