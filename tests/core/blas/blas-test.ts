import { equals, notEquals, test } from "naive-tests-ts";
import { loadBlasModule } from "../../../src/core/blas/blas-loader";
import { Blas } from "../../../src/core/blas/blas";


let blas : Blas | null;

async function testBlas() {
    let p = await loadBlasModule();
    if (p === null) throw Error();
    p.testArrays();
}



test('blas initialization', () => {
    console.log("blas init");
    testBlas();
    console.log("blas end");
});

/*
export async function initialization(game: Game) {
    const blas = await loadBlasModule();
    if (blas === null) throw Error();
  */  

