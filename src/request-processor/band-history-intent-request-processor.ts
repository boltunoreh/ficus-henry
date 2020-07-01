import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";
import {ButtonService} from "../service/button-service";

export class BandHistoryIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createResponse(
            'Эта история стара как мир. В далеком 2019 собрались Илья-Шмилья, Андрей-Шмандрей, Павел-Шмавел и Алёна-Шмалёна поиграть на гитарах да постучать в барабаны. Так и играют с тех пор.',
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