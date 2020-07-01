import {YandexRequest} from "../dto/yandex-request";
import {AbstractSongRequestProcessor} from "./abstract-request-processor";

export class SongInfoIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest): Promise<any> {
        let sessionState = yandexRequest.sessionState;
        let alias;
        let infoType;
        
        if (yandexRequest.intents.song_info) {
            alias = yandexRequest.intents.song_info.slots.alias.value;

            if (yandexRequest.intents.song_info.slots.infoType) {
                infoType = yandexRequest.intents.song_info.slots.infoType.value;
            }
        } else if (yandexRequest.intents.action.slots.action.value === 'song_chords'
            || yandexRequest.intents.action.slots.action.value === 'song_text'
        ) {
            if (yandexRequest.intents.action.slots.action.value === 'song_chords') {
                infoType = 'chords';
            } else {
                infoType = 'text';
            }
        }

        if (!alias && !infoType) {
            return this.createInvalidResponse(yandexRequest);
        }

        if (!alias) {
            alias = sessionState.songAlias;
        }
        if (!infoType) {
            infoType = sessionState.action === 'navigation' ? null : sessionState.infoType;
        }

        if (!alias) {
            return this.whichSong(infoType);
        }

        if (!infoType) {
            return this.whichInfoType(alias);
        }

        return await this.processSongInfo(alias, infoType);
    }

    private async whichSong(infoType: string) {
        const songNames = await this.songRepository.getAllSongNames();
        let responseText = 'Для какой песни? ' + songNames.join(', ');

        let buttons = [];
        for (let i = 0; i < songNames.length; i++) {
            buttons.push({
                title: songNames[i],
                hide: true
            });
        }

        return this.createResponse(
            responseText,
            '',
            buttons,
            {
                infoType: infoType
            }
        );
    }

    private whichInfoType(alias: string) {
        return this.createResponse(
            'Что конкретно?',
            '',
            [
                {title: 'Аккорды', hide: true},
                {title: 'Текст', hide: true},
            ],
            {
                songAlias: alias
            }
        );
    }

    private async processSongInfo(alias: string, infoType: string) {
        const song = await this.songRepository.findOneByAlias(alias);

        if (infoType === 'chords') {
            return this.createResponse(song.chords);
        }

        return this.createResponse(
            song.text[0],
            '',
            [
                {title: 'Дальше', hide: true},
            ],
            {
                action: 'navigation',
                infoType: 'text',
                songAlias: song.alias,
                line: 0
            }
        );
    }
}