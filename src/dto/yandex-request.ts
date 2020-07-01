export class YandexRequest {
    isNew: boolean;
    intents: any;
    sessionState: any;
    command: string;

    constructor(isNew: boolean, intents: any, sessionState: any, command: string) {
        this.isNew = isNew;
        this.intents = intents;
        this.sessionState = sessionState;
        this.command = command;
    }
}