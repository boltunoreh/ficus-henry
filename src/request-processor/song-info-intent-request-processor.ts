import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum, SongInfoTypeEnum} from "../types/enums";
import {AbstractSongRequestProcessor} from "./abstract-song-request-processor";
import {AnswerService} from "../service/answer-service";

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
        const responseText = AnswerService.getWhichSongAnswer(songNames);

        const buttons = [];
        for (const songName of songNames) {
            buttons.push(songName);
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
        const responseText = AnswerService.getWhichInfoTypeAnswer();

        return this.createResponse(
            responseText,
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
            ButtonTitleEnum.CHOOSE_ANOTHER_SONG,
        ];

        const song = await this.songRepository.findOneByAlias(alias);

        if (infoType === SongInfoTypeEnum.CHORDS) {
            const chordsItem = song.chords[0];

            if (song.chords.length === 1) {
                responseText = chordsItem.chords;

                const chordsCount = chordsItem.chords.split(' ').length;

                tts = AnswerService.getSimpleChordsTts(chordsCount, responseText);
            } else {
                responseText = `${chordsItem.type}: ${chordsItem.chords}`;
                tts = AnswerService.getComplexChordsTts(responseText);
                buttons.unshift(ButtonTitleEnum.FORWARD);
            }
        } else if (infoType === SongInfoTypeEnum.TEXT) {
            responseText = song.text[0];
            buttons.unshift(ButtonTitleEnum.FORWARD);
            buttons.unshift(ButtonTitleEnum.FULL_TEXT);
        } else if (infoType === SongInfoTypeEnum.FULL_TEXT) {
            responseText = song.text.join('\n');
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