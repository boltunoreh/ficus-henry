import {Button} from "../model/button";

export class ButtonService {
    static createButtons(titles: string[]) {
        let buttons = [];

        for (let title of titles) {
            buttons.push(new Button({title: title}))
        }

        return buttons;
    }
}