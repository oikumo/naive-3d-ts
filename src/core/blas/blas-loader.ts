import loadLocalBlas from './local-blas';
import { Blas } from './blas';

export async function loadBlasModule() {
  const blas = await loadLocalBlas();
  return new Blas(blas);
}



