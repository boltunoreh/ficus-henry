import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";

export class EventsIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createResponse(
            'На ближайшее время мероприятий не запланировано, но все ещё впереди!',
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