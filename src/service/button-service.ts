import {Button} from "../model/button";

export class ButtonService {
    static createButtons(titles: string[]) {
        const buttons = [];

        for (const title of titles) {
            buttons.push(new Button({title}))
        }

        return buttons;
    }
}