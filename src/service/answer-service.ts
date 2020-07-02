import {YandexRequest} from "../model/yandex-request";

export class AnswerService {
    static getInvalidRequestAnswer(yandexRequest: YandexRequest): string {
        let variants = [
            'Простите, я вас не поняла',
            'Не могли бы повторить?',
            'Кажется, мы говорим на разных языках',
            'Будьте здоровы',
            'Хз, это не ко мне'
        ];

        if (yandexRequest.sessionState.invalidRequestMessage) {
            variants = variants.filter(val => val !== yandexRequest.sessionState.invalidRequestMessage);
        }

        if (yandexRequest.command.length < 10) {
            variants.push('Что ещё за ' + yandexRequest.command + '?');
        }

        return this.getRandomElement(variants);
    }

    static getBandHistoryAnswer(): string {
        return this.getRandomElement([
            'Эта история стара как мир. В далеком 2019 собрались Илья-Шмилья, Андрей-Шмандрей, Павел-Шмавел и Алёна-Шмалёна поиграть на гитарах да постучать в барабаны. Так и играют с тех пор.',
        ]);
    }

    static getEventsAnswer(): string {
        return this.getRandomElement([
            'На ближайшее время мероприятий не запланировано, но все ещё впереди!',
            'В связи с пандемией коровавируса все многочисленные мероприятия отменены, следите за обновлениями в инстаграме',
        ]);
    }

    static getHelpAnswer(): string {
        return this.getRandomElement([
            'Я могу перечислить песни группы, напомнить аккорды, зачитать текст, рассказать историю группы или рассказать о ближайших мероприятиях.',
            'Всё, что хотите: перечислить песни, напомнить аккорды или текст, рассказать историю группы или о предстоящих мероприятиях.',
        ]);
    }

    static getWhichSongAnswer(songNames: string[]): string {
        const whichSong = this.getRandomElement([
            'Для какой песни?',
            'Что за трек?',
            'Давайте сначла выберем песню',
        ]);

        return whichSong + ' ' + songNames.join(', ');
    }

    static getWhichInfoTypeAnswer(): string {
        return this.getRandomElement([
            'Аккорды или текст?',
            'Слова или ноты?',
        ]);
    }

    static getSongListAnswer(songNames: string[]): string {
        const preText = this.getRandomElement([
            'Не так их и много:',
            'Почти на альбом набралось:',
        ]);

        return preText + ' ' + songNames.join(', ');
    }

    static getRestartAnswer(): string {
        return this.getRandomElement([
            'Давайте начнем сначала?',
        ]);
    }

    static getEndOfSongAnswer(): string {
        return this.getRandomElement([
            'Дальше некуда. Повторить?',
            'Это конец, но можно повторить',
        ]);
    }

    static getStartOfSongAnswer(): string {
        return this.getRandomElement([
            'Отступать некуда, но можно перейти к другим песням',
        ]);
    }

    static getSimpleChordsTts(chordsCount: number, responseText: string): string {
        let tts;

        if (chordsCount === 2) {
            tts = this.getRandomElement([
                'Это изи, ведь их тут всего 2. Как и в большинстве других песен:',
                'Два начала – Небо и Земля. Два аккорда: ',
            ]);
        } else if (chordsCount === 3) {
            tts = this.getRandomElement([
                'Три аккорда, как три кита, на которых держится творчество группы:',
                'Сколько аккордов нужно, чтобы вкрутить лампочку? Правильно, три: .',
            ]);
        } else if (chordsCount <= 5) {
            tts = this.getRandomElement([
                'Соберитесь, аккорды этой песни по пальцам одной руки не сосчитать. Если, конечно, вы черепашка-ниндзя.',
            ]);
        } else {
            tts = this.getRandomElement([
                'Надеюсь вы заканчивали консерваторию, иначе не знаю, как вы это все запомните:',
            ]);
        }

        return tts + ' ' + responseText;
    }

    static getComplexChordsTts(responseText: string): string {
        const tts = this.getRandomElement([
            'Аккордов в этой песне столько, что я боюсь вываливать их на вас разом. Так что будем двигаться потихоньку.',
            'Тише едешь - дальше будешь, так что давайте запомниать по частям.',
        ]);

        return tts + ' ' + responseText;
    }

    private static getRandomElement(arr: string[]) {
        const index = Math.floor(Math.random() * arr.length);

        return arr[index];
    }
}