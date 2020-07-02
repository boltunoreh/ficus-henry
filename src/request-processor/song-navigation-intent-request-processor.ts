import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum, SongInfoTypeEnum, SongNavigationIntentEnum} from "../types/enums";
import {AbstractSongRequestProcessor} from "./abstract-song-request-processor";
import {AnswerService} from "../service/answer-service";

export class SongNavigationIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest): Promise<any> {
        let responseText = '';
        const sessionState = yandexRequest.sessionState;
        let songInfo;

        if (!sessionState.songAlias) {
            responseText = AnswerService.getRestartAnswer();

            return this.createResponse(
                responseText,
                '',
                [ButtonTitleEnum.WHAT_CAN_YOU_DO]
            );
        }

        const song = await this.songRepository.findOneByAlias(sessionState.songAlias);

        if (yandexRequest.sessionState.infoType === SongInfoTypeEnum.CHORDS) {
            songInfo = song.chords;
        } else {
            songInfo = song.text;
        }

        let buttons = [
            ButtonTitleEnum.BACK,
            ButtonTitleEnum.FORWARD,
            ButtonTitleEnum.REPEAT,
            ButtonTitleEnum.CHOOSE_ANOTHER_SONG,
        ];

        switch (yandexRequest.intents.song_navigation.slots.direction.value) {
            case SongNavigationIntentEnum.NEXT:
                if (songInfo.length <= sessionState.line + 1) {
                    responseText = AnswerService.getEndOfSongAnswer();

                    buttons = [
                        ButtonTitleEnum.RESTART,
                        ButtonTitleEnum.CHOOSE_ANOTHER_SONG,
                    ];
                } else {
                    sessionState.line++;
                }
                break;
            case SongNavigationIntentEnum.PREVIOUS:
                if (sessionState.line === 0) {
                    responseText = AnswerService.getStartOfSongAnswer();

                    buttons = [
                        ButtonTitleEnum.CHOOSE_ANOTHER_SONG,
                    ];
                } else {
                    sessionState.line--;
                }
                break;
            case SongNavigationIntentEnum.REPEAT:
                break;
            case SongNavigationIntentEnum.REPEAT_SONG:
                sessionState.line = 0;
                break;
        }

        if (responseText === '') {
            if (yandexRequest.sessionState.infoType === SongInfoTypeEnum.TEXT) {
                responseText = song.text[sessionState.line];
            } else {
                if (song.chords.length === 1) {
                    responseText = song.chords[sessionState.line].chords;
                } else {
                    responseText = `${song.chords[sessionState.line].type}: ${song.chords[sessionState.line].chords}`;
                }
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