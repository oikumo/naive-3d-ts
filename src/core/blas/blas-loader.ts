import * as blasWasm from 'naive-blas-wasm';
import { Blas } from './blas';

export async function loadBlasModule() {
    let blas: blasWasm.MainModule | null = null;
    try {  
      blas = await blasWasm.default();
    } catch (err) {
      throw Error('Load BLAS module error');
    }
  
    if (blas === null){
      throw Error('Load BLAS module error');
    } 
  
    return new Blas(blas);
}



