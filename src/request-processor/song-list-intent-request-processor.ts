import {YandexRequest} from "../dto/yandex-request";
import {AbstractSongRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class SongListIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest) {
        const songNames = await this.songRepository.getAllSongNames();

        let buttons = [];

        for (let i = 0; i < songNames.length; i++) {
            buttons.push({
                title: songNames[i],
                hide: true
            });
        }

        buttons.push({title: 'Напомнить аккорды', hide: true}, {title: 'Зачитать текст', hide: true});

        return this.createResponse(
            songNames.join(', '),
            '',
            buttons
        );
    }
}