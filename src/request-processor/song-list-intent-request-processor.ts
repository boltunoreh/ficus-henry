import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";
import {AbstractSongRequestProcessor} from "./abstract-song-request-processor";
import {AnswerService} from "../service/answer-service";

export class SongListIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest) {
        let sessionState = {};
        const songNames = await this.songRepository.getAllSongNames();
        const buttons = [];

        for (const songName of songNames) {
            buttons.push(songName);
        }

        const responseText = AnswerService.getSongListAnswer(songNames);

        buttons.push(ButtonTitleEnum.SONG_CHORDS, ButtonTitleEnum.SONG_TEXT);

        if (yandexRequest.sessionState.infoType) {
            sessionState = {
                infoType: yandexRequest.sessionState.infoType
            }
        }

        return this.createResponse(
            responseText,
            '',
            buttons,
            sessionState
        );
    }
}