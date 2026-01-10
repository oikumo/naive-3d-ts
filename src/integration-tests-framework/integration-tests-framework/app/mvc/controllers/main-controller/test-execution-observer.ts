import { TestExecution, TestExecutionState } from "../../../../test-runner/test-execution";
import { ITestRunnerObserver } from "../../../../test-runner/test-runner-execution";
import { Model } from "../../model/model";
import { ModelTestResult } from "../../model/test-result";
import { MainController } from "./main-controller";

export class TestRunnerObserver implements ITestRunnerObserver {

    client: MainController;

    constructor(client: MainController) {
        this.client = client;
    }

    updateResults(newResults: Array<TestExecution>): void {
        const modelResults = Array<ModelTestResult>();

        for (let result of newResults) {
            const modelResult = new ModelTestResult();
            modelResult.title = result.testName;
            modelResult.description = result.description;
            modelResult.pass = result.result === TestExecutionState.PASS;
            modelResult.messages = result.messages;
            modelResults.push(modelResult);
        }

        modelResults.sort((left, right) => {
            if (left.pass === right.pass) return 0;
            return left.pass ? 1 : -1;
        });


        Model.storeTestExecutionResult(modelResults);
        this.client.updateResults();
    }
}
