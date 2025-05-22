import { ModelTestResult } from "../model/test-result";
import { Dashboard } from "../views/dashboard";
import { Information } from "./interface/Information";
import { DashboardTestResult } from "./interface/DashboardTestResult";

export class DashboardController {
    #view: Dashboard;
    
    constructor(information: Information) {
        this.#view = new Dashboard("app", information);
    }

    updateTestResults(results: Array<DashboardTestResult>) {
        const modelResults = Array<ModelTestResult>();
        for (let result of results) {
            const modelResult = new ModelTestResult();
            modelResult.description = result.description;
            modelResults.push(modelResult);
        }
        this.#view.updateTestResults(modelResults);
    }
}