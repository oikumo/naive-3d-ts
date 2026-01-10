import { TestState } from "./test-state";

export class ModelTestResult {
    state = TestState.NONE;
    title = "";
    description = "";
    messages = new Array<string>();
    pass = false;
}

