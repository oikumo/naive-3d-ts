import { N3Canvas } from './screen/screen.ts';
import { Color } from './common/colors.ts';
import * as blas from 'naive-blas-wasm';

async function run() {
  let x = await blas.default();
  console.log(x.int_sqrt(9));
  main();
}

run();

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

  },10);
  
}


