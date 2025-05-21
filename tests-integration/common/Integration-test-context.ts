import { Blas } from "../../src/core/blas/blas";
import { loadBlasModule } from "../../src/core/blas/blas-loader";
import { IntegrationTestContextError } from "./Integration-test-context-error";

export class IntegrationTestContext {
    #blas: Blas;

    get blas() { return this.#blas ;}

    private constructor(blas: Blas) {
        this.#blas = blas;
    }

    static async create() {
        try {
            const blas = await loadBlasModule();
            return new IntegrationTestContext(
                blas
            );
        
        } catch (err){
            throw new IntegrationTestContextError(err);
        }
    }
}


