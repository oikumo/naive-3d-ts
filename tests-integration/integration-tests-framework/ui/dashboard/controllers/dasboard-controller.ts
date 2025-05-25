import { ModelTestResult } from "../model/test-result";
import { DashboardView } from "../views/dashboard-view";
import { Information } from "./interface/Information";
import { DashboardTestResult } from "./interface/DashboardTestResult";

export class DashboardController {
    #view: DashboardView;
    
    constructor(information: Information) {
        this.#view = new DashboardView("app", information);
    }

    updateTestResults(results: Array<DashboardTestResult>) {
        const modelResults = Array<ModelTestResult>();

        for (let result of results) {
            const modelResult = new ModelTestResult();
            modelResult.description = result.description;
            modelResult.pass = result.pass;
            modelResult.messages = result.messages;
            modelResults.push(modelResult);
        }

        modelResults.sort((left, _) => {
            return left.pass ? 1 : -1;
        });


        this.#view.updateTestResults(modelResults);
    }
}