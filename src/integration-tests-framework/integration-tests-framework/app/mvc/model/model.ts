import { ModelTestResult } from "./test-result";
 
abstract class Item {
    static readonly CURRENT_EXECUTION = 'current_execution';
}

type ItemKey = string;

export class Model {

    static deserialize<T>(key: ItemKey){
        const data = sessionStorage.getItem(key);
        if (data === null) return null;

        try {
            return JSON.parse(data) as T;
        } catch(_) {
            return null;
        }
    }

    static retrieveTestExecutionResult() {
        return this.deserialize<Array<ModelTestResult>>(Item.CURRENT_EXECUTION);
    }

    static storeTestExecutionResult(results: Array<ModelTestResult>) {
        sessionStorage.setItem(Item.CURRENT_EXECUTION, JSON.stringify(results));
    }

    static updateCurrentTestInfo() {
        sessionStorage["test_info"] = 'data time: ' + Date.now().toString();
    }

    static getCurrentTestInfo() {
        let value = sessionStorage.getItem("test_info");
        if (value === null) {
            value =  "no info"
            sessionStorage.setItem("test_info", value);
        }

        return value; 
    }
}