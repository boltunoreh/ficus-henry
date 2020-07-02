import {YandexRequest} from "../model/yandex-request";
import {SongInfoTypeEnum} from "../types/enums";
import {AbstractSongRequestProcessor} from "./abstract-song-request-processor";

export class SongNavigationIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest): Promise<any> {
        const sessionState = yandexRequest.sessionState;
        let songInfo;

        if (!sessionState.songAlias) {
            return this.createResponse(
                'Давайте начнем сначала?',
                '',
                ['Что ты умеешь?']
            );
        }

        const song = await this.songRepository.findOneByAlias(sessionState.songAlias);

        if (yandexRequest.sessionState.infoType === SongInfoTypeEnum.CHORDS) {
            songInfo = song.chords;
        } else {
            songInfo = song.text;
        }

        let responseText = '';
        let buttons = [
            'Назад',
            'Дальше',
            'Повторить',
            'Выбрать другую песню'
        ];

        switch (yandexRequest.intents.song_navigation.slots.direction.value) {
            case 'next':
                if (songInfo.length <= sessionState.line + 1) {
                    responseText = 'Дальше некуда. Повторить?';
                    buttons = [
                        'Начать сначала',
                        'Выбрать другую песню'
                    ];
                } else {
                    sessionState.line++;
                }
                break;
            case 'previous':
                if (sessionState.line === 0) {
                    responseText = 'Отступать некуда, но можно перейти к другим песням';
                    buttons = [
                        'Выбрать другую песню',
                    ];
                } else {
                    sessionState.line--;
                }
                break;
            case 'repeat':
                break;
            case 'repeat_song':
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