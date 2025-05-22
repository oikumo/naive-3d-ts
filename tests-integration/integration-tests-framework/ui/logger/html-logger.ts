import { Dashboard } from "../dashboard/dashboard";

export class HtmlLogger {
    #dashboard: Dashboard;

    constructor(dashboard: Dashboard){
        this.#dashboard = dashboard;
    }


    log(message: string) {
        this.#dashboard.setResult(message);
        //this.createText(message);
    }

    success(message: string) {
        //this.createParagraph(message);
    }    
}

