import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";
import {ButtonService} from "../service/button-service";
import {AnswerService} from "../service/answer-service";

export class BandHistoryIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        const responseText = AnswerService.getBandHistoryAnswer();

        return this.createResponse(
            responseText,
            '',
            [
                ButtonTitleEnum.SONG_LIST,
                ButtonTitleEnum.SONG_CHORDS,
                ButtonTitleEnum.SONG_TEXT,
                ButtonTitleEnum.BAND_HISTORY,
                ButtonTitleEnum.EVENTS
            ],
            {},
            {
                type: "BigImage",
                image_id: '937455/92c4dbe60382f05e87f4',
                title: "Instagram",
                button: {
                    url: "https://www.instagram.com/ficus.henry/"
                }
            }
        );
    }
}