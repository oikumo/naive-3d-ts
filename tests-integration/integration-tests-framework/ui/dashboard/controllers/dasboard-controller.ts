import { ModelTestResult } from "../model/test-result";
import { Dashboard } from "../views/dashboard";

export class Information {
    title: string;
    version: string;

    constructor(title: string, version: string) {
        this.title = title;
        this.version = version;
    }
}

export class DashboardTestResult {
    description: string;
    messages = new Array<string>();
    pass = false;
}


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
        this.#view.setResult(modelResults);
    }
}