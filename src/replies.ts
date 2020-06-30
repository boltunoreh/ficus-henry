import {SongRepository} from "./repository/song-repository";

export class Replies {
    welcome() {
        const greeting = this.getRandomElement(['Привет', 'Здравствуйте']);

        return this.createResponse(
            `${greeting}! Я - ваш виртуальный путеводитель по творчеству группы Фикус Генри. Если что-то нужно - только попросите.`,
            '',
            [
                {title: 'Что ты умеешь?', hide: true},
            ]);
    };

    async process(command: string, intents: any, sessionState: any) {
        try {
            if (Object.keys(intents).length) {
                return await this.processIntents(intents, sessionState);
            } else {
                // todo log command
                return this.invalid();
            }
        } catch (err) {
            return this.createResponse(err);
        }
    }

    async processIntents(intents: any, sessionState: any) {
        if ('YANDEX.WHAT_CAN_YOU_DO' in intents || 'YANDEX.HELP' in intents) { // todo move to enum
            return this.help();
        } else if ('action' in intents) {
            return await this.processAction(intents.action.slots.action.value, sessionState);
        } else if ('song_name' in intents) {
            return await this.processSongName(intents.song_name.slots.alias.value, sessionState);
        } else if ('song_info' in intents) {
            return await this.processSongInfo(intents.song_info.slots.alias.value, intents.song_info.slots.infoType.value);
        } else if ('song_navigation' in intents) {
            return this.processSongNavigation(intents.song_navigation.slots.direction.value, sessionState);
        } else {
            return this.invalid();
        }
    };

    async processAction(action: string, sessionState: any) {
        let responseText = '';
        let songNames;
        let buttons = [];
        const songRepository = new SongRepository();  // todo refactor

        switch (action) {
            case 'list_songs':
                songNames = await songRepository.getAllSongNames();
                responseText = songNames.join(', ');
                break;
            case 'song_chords':
                if (sessionState.songAlias) {
                    return await this.processSongInfo(sessionState.songAlias, 'chords')
                }

                songNames = await songRepository.getAllSongNames();
                responseText = 'Для какой песни? ' + songNames.join(', ');
                for (let i = 0; i < songNames.length; i++) {
                    buttons.push({
                        title: songNames[i],
                        hide: true
                    });
                }
                sessionState = {
                    infoType: 'chords'
                };
                break;
            case 'song_text':
                if (sessionState.songAlias) {
                    return await this.processSongInfo(sessionState.songAlias, 'text')
                }

                songNames = await songRepository.getAllSongNames();
                responseText = 'Для какой песни? ' + songNames.join(', ');
                for (let i = 0; i < songNames.length; i++) {
                    buttons.push({
                        title: songNames[i],
                        hide: true
                    });
                }
                sessionState = {
                    infoType: 'text'
                };
                break;
            case 'band_story':
                responseText = 'Эта история стара как мир. В далеком 2019 собрались ребята поиграть музыку. Так и играют с тех пор.';
                break;
            case 'events':
                responseText = 'На ближайшее время мероприятий не запланировано, но все ещё впереди!';
                break;
        }

        if (responseText === '') {
            return this.invalid();
        }

        return this.createResponse(responseText, '', buttons, sessionState);
    }

    async processSongName(alias: string, sessionState: any) {
        if (sessionState.infoType) {
            return await this.processSongInfo(alias, sessionState.infoType)
        } else {
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
    }

    async processSongInfo(alias: string, infoType: string) {
        const songRepository = new SongRepository(); // todo refactor

        const song = await songRepository.findOneByAlias(alias);

        if (infoType === 'chords') {
            return this.createResponse(song.chords);
        } else if (infoType === 'text') {
            return this.createResponse(
                song.text[0],
                '',
                [
                    {title: 'Дальше', hide: true},
                ],
                {
                    infoType: 'text',
                    songAlias: song.alias,
                    line: 0
                }
            );
        } else {
            return this.invalid();
        }
    }

    async processSongNavigation(navigationDirection: string, sessionState: any) {
        const songRepository = new SongRepository(); // todo refactor

        const song = await songRepository.findOneByAlias(sessionState.songAlias);

        if (sessionState.infoType === 'text') {
        }

        let responseText = '';
        let buttons = [
            {title: 'Дальше', hide: true},
            {title: 'Назад', hide: true},
            {title: 'Повторить', hide: true},
        ];

        switch (navigationDirection) {
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
            return this.invalid();
        }

        return this.createResponse(
            responseText,
            '',
            buttons,
            sessionState
        );
    }

    invalid() {
        return this.createResponse('Простите, я вас не поняла.');
    };

    help() {
        return this.createResponse(
            'Я могу перечислить песни группы, напомнить аккорды, зачитать текст, рассказать историю группы или рассказать о ближайших мероприятиях.',
            '',
            [
                {title: 'Перечислить песни', hide: true},
                {title: 'Напомнить аккорды', hide: true},
                {title: 'Зачитать текст', hide: true},
                {title: 'История группы', hide: true},
                {title: 'Афиша', hide: true},
            ]
        );
    };

    private createResponse(
        text: string,
        tts: string = '',
        buttons: Array<object> = [],
        sessionState: object = {}
    ): object {
        if (tts === '') {
            tts = text;
        }

        return {
            response: {
                text: text,
                tts: tts,
                buttons: buttons,
                end_session: false
            },
            session_state: {
                value: sessionState
            },
            version: '1.0'
        };
    }

    private getRandomElement(arr: string[]) {
        const index = Math.floor(Math.random() * arr.length);

        return arr[index];
    }
}