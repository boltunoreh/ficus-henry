import {YandexRequest} from "../model/yandex-request";
import {IRequestProcessor} from "../types/interfaces";
import {ButtonService} from "../service/button-service";
import {ButtonTitleEnum} from "../types/enums";
import {logger} from "../logger";
import {AnswerService} from "../service/answer-service";

export abstract class AbstractRequestProcessor implements IRequestProcessor {

    abstract process(yandexRequest: YandexRequest): Promise<any>;

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

        const responseText = AnswerService.getInvalidRequestAnswer(yandexRequest);

        return this.createResponse(
            responseText,
            '',
            [ButtonTitleEnum.WHAT_CAN_YOU_DO],
            {
                invalidRequestMessage: responseText
            }
        );
    }
}