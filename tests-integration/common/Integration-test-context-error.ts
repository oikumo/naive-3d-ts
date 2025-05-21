export class IntegrationTestContextError extends Error {

    constructor(message: string) {
        super(message);
        this.cause = message;
    }
}
