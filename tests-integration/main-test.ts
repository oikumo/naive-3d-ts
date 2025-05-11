import { Blas } from '../src/core/blas/blas';
import { loadBlasModule } from '../src/core/blas/blas-loader'

console.log('Integration Test Run');

function blasTests(blas: Blas) {
    const results = blas.testArrays();
    const app = document.getElementById("app");
 
    results.forEach(text => {
        const newDiv = document.createElement("div");
        newDiv.appendChild(document.createTextNode(text));
        app?.appendChild(newDiv);
    });
} 

async function runIntegrationTests(blasTests: (blas: Blas) => void) {
    const blas = await loadBlasModule();
    if (blas === null) throw Error();

    blasTests(blas);
}

runIntegrationTests(blasTests);

