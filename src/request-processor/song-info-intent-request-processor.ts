import {AbstractSongRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {SongInfoTypeEnum} from "../types/enums";

export class SongInfoIntentRequestProcessor extends AbstractSongRequestProcessor {
    async process(yandexRequest: YandexRequest): Promise<any> {
        const sessionState = yandexRequest.sessionState;
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
                infoType = SongInfoTypeEnum.CHORDS;
            } else {
                infoType = SongInfoTypeEnum.TEXT;
            }
        }

        if (!alias && !infoType) {
            return this.createInvalidResponse(yandexRequest);
        }

        alias = alias || sessionState.songAlias;
        infoType = infoType || sessionState.infoType;

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
        const responseText = 'Для какой песни? ' + songNames.join(', ');

        const buttons = [];
        for (let i = 0; i < songNames.length; i++) {
            buttons.push(songNames[i]);
        }

        return this.createResponse(
            responseText,
            '',
            buttons,
            {
                infoType
            }
        );
    }

    private whichInfoType(alias: string) {
        return this.createResponse(
            'Аккорды или текст?',
            '',
            [
                'Аккорды',
                'Текст',
            ],
            {
                songAlias: alias
            }
        );
    }

    private async processSongInfo(alias: string, infoType: string) {
        let responseText;
        let tts;
        const buttons = [
            'Выбрать другую песню',
        ];

        const song = await this.songRepository.findOneByAlias(alias);

        if (infoType === SongInfoTypeEnum.CHORDS) {
            const chordsItem = song.chords[0];

            if (song.chords.length === 1) {
                responseText = chordsItem.chords;

                const chordsCount = chordsItem.chords.split(' ').length;

                if (chordsCount === 2) {
                    tts = 'Это изи, ведь их тут всего 2. Как и в большинстве других песен. ' + responseText;
                } else if (chordsCount <= 5) {
                    tts = 'Соберитесь, аккорды этой песни по пальцам одной руки не сосчитать. Если, конечно, вы черепашка-ниндзя. ' + responseText;
                } else {
                    tts = 'Уверены, что готовы? Тут нужно минимум год в консерватории, чтоб всё запомнить. ' + responseText;
                }
            } else {
                responseText = `${chordsItem.type}: ${chordsItem.chords}`;
                tts = 'Аккордов в этой песне столько, что я боюсь вываливать их на вас разом. Так что будем двигаться потихоньку. ' + responseText;
                buttons.unshift('Дальше');
            }
        } else {
            responseText = song.text[0];
            buttons.unshift('Дальше');
        }

        return this.createResponse(
            responseText,
            tts ? tts : responseText,
            buttons,
            {
                infoType,
                songAlias: song.alias,
                line: 0
            }
        );
    }
}