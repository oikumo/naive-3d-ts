import * as blasWasm from 'naive-blas-wasm';
import { Blas } from './blas';

export async function loadBlasModule() {
    let blas: blasWasm.MainModule | null = null;
    try {  
      blas = await blasWasm.default();
    } catch (err) {
      console.error(err);
    }
  
    if (blas === null){
      return null;
    } 
  
    return new Blas(blas);
}



