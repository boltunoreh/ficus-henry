import {YandexRequest} from "../model/yandex-request";
import {IRequestProcessor} from "../types/interfaces";
import {ButtonService} from "../service/button-service";
import {ButtonTitleEnum} from "../types/enums";
import {logger} from "../logger";

export abstract class AbstractRequestProcessor implements IRequestProcessor {

    abstract process(yandexRequest: YandexRequest): Promise<any>;

    protected getRandomElement(arr: string[]) {
        const index = Math.floor(Math.random() * arr.length);

        return arr[index];
    }

    protected createResponse(
        text: string,
        tts: string = '',
        buttonTitles: string[] = [],
        sessionState: object = {},
        card: object = null
    ): object {
        if (tts === '') {
            tts = text;
        }

        const buttons = ButtonService.createButtons(buttonTitles);

        return {
            response: {
                text,
                tts,
                card,
                buttons,
                end_session: false
            },
            session_state: {
                value: sessionState
            },
            version: '1.0'
        };
    }

    protected createInvalidResponse(yandexRequest: YandexRequest): any {
        logger.warn('Invalid request command: ' + JSON.stringify(yandexRequest));

        let variants = [
            'Простите, я вас не поняла',
            'Не могли бы повторить?',
            'Кажется, мы говорим на разных языках',
            'Будьте здоровы',
            'Хз, это не ко мне'
        ];

        if (yandexRequest.sessionState.invalidRequestMessage) {
            variants = variants.filter(val => val !== yandexRequest.sessionState.invalidRequestMessage);
        }

        if (yandexRequest.command.length < 10) {
            variants.push('Что ещё за ' + yandexRequest.command + '?');
        }

        const text = this.getRandomElement(variants);

        return this.createResponse(
            text,
            '',
            [ButtonTitleEnum.WHAT_CAN_YOU_DO],
            {
                invalidRequestMessage: text
            }
        );
    }
}