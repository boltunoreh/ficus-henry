import {AbstractSongRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";

export class SongListIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest) {
        let sessionState = {};
        const songNames = await this.songRepository.getAllSongNames();

        const buttons = [];

        for (let i = 0; i < songNames.length; i++) {
            buttons.push(songNames[i]);
        }

        buttons.push(ButtonTitleEnum.SONG_CHORDS, ButtonTitleEnum.SONG_TEXT);

        if (yandexRequest.sessionState.infoType) {
            sessionState = {
                infoType: yandexRequest.sessionState.infoType
            }
        }

        return this.createResponse(
            songNames.join(', '),
            '',
            buttons,
            sessionState
        );
    }
}