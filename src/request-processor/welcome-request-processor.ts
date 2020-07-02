import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";
import {AnswerService} from "../service/answer-service";

export class WelcomeRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        const responseText = AnswerService.getWelcomeAnswer();

        return this.createResponse(
            responseText,
            '',
            [
                ButtonTitleEnum.WHAT_CAN_YOU_DO,
            ]);
    }
}