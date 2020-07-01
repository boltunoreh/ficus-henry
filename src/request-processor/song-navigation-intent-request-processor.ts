import {YandexRequest} from "../dto/yandex-request";
import {AbstractSongRequestProcessor} from "./abstract-request-processor";

export class SongNavigationIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest): Promise<any> {
        let sessionState = yandexRequest.sessionState;

        const song = await this.songRepository.findOneByAlias(sessionState.songAlias);

        if (yandexRequest.sessionState.infoType === 'text') {
        }

        let responseText = '';
        let buttons = [
            {title: 'Дальше', hide: true},
            {title: 'Назад', hide: true},
            {title: 'Повторить', hide: true},
        ];

        switch (yandexRequest.intents.song_navigation.slots.direction.value) {
            case 'next':
                if (song.text.length <= sessionState.line + 1) {
                    responseText = 'Дальше некуда. Повторить?';
                    buttons = [
                        {title: 'Начать сначала', hide: true},
                        {title: 'Следующая песня', hide: true}
                    ];
                } else {
                    sessionState.line++;
                    responseText = song.text[sessionState.line];
                }
                break;
            case 'previous':
                if (sessionState.line === 0) {
                    responseText = 'Отступать некуда, но можно перейти к другим песням';
                    buttons = [
                        {title: 'Выбрать другую песню', hide: true},
                        {title: 'Следующая песня', hide: true}
                    ];
                } else {
                    sessionState.line--;
                    responseText = song.text[sessionState.line];
                }
                break;
            case 'repeat':
                responseText = song.text[sessionState.line];
        }

        if (responseText === '') {
            return this.createInvalidResponse(yandexRequest);
        }

        return this.createResponse(
            responseText,
            '',
            buttons,
            sessionState
        );
    }
}