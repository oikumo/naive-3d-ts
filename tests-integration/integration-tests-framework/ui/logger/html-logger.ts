import { DashboardController } from "../dashboard/controllers/dasboard-controller";
import { DashboardTestResult } from "../dashboard/controllers/interface/DashboardTestResult";

export class HtmlLogger {
    #dashboard: DashboardController;
    #testResults = new Array<DashboardTestResult>();

    constructor(dashboard: DashboardController){
        this.#dashboard = dashboard;
    }

    newTestResult(description: string) {
        const testResult = new DashboardTestResult();
        testResult.description = description;
        this.#testResults.push(testResult);

        return testResult;
    }

    log(message: string) {
        if (this.#testResults.length === 0) return;
        this.#testResults[this.#testResults.length - 1].messages.push(message);
    }

    addResult() {
        this.#dashboard.updateTestResults(this.#testResults);
    }

    success(message: string) {
    }    
}

