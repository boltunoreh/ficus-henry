export class Button {
    title: string;
    hide = true;

    constructor(data: {title: string}) {
        this.title = data.title;
    }
}