import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";
import {AnswerService} from "../service/answer-service";

export class HelpIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        const responseText = AnswerService.getHelpAnswer();

        return this.createResponse(
            responseText,
            '',
            [
                ButtonTitleEnum.SONG_LIST,
                ButtonTitleEnum.SONG_CHORDS,
                ButtonTitleEnum.SONG_TEXT,
                ButtonTitleEnum.BAND_HISTORY,
                ButtonTitleEnum.EVENTS,
            ]
        );
    }
}