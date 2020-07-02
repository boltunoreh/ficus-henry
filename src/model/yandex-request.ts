export class YandexRequest {
    isNew: boolean;
    intents: any;
    sessionState: any;
    command: string;

    constructor(data: any) {
        this.isNew = data.body.session.new;
        this.intents = data.body.request.nlu.intents;
        this.sessionState = data.body.state.session.value;
        this.command = data.body.request.command;
    }
}