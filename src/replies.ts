export class Replies {
    /**
     * Welcome message
     */
    public static welcome() {
        const greeting = this.getRandomElement(['Привет', 'Здравствуйте']);

        return {
            text: `${greeting}! Я - ваш виртуальный путеводитель по творчеству группы Фикус Генри. Если что-то нужно - только попросите.`,
            buttons: [
                {title: 'Что ты умеешь?', hide: true},
            ],
            end_session: false
        };
    };

    public static invalid() {
        return this.help('Простите, я вас не поняла.')
    };

    public static help(preText: string) {
        return {
            text: `${preText} ${this.getHelpText()}`,
            buttons: [
                {title: 'Перечислить песни', hide: true},
                {title: 'Напомнить аккорды', hide: true},
                {title: 'Зачитать текст', hide: true},
                {title: 'История группы', hide: true},
                {title: 'Афиша', hide: true},
            ],
            end_session: false
        };
    };

    private static getHelpText() {
        return 'Я могу перечислить песни группы, напомнить аккорды, зачитать текст, рассказать историю группы или рассказать о ближайших мероприятиях.';
    };

    /**
     * Reply
     *
     * @param {String} text
     * @param {String} tts
     */
    public static reply(text: string, tts = '') {
        let result;

        if (tts !== '') {
            result = {
                text,
                tts,
                end_session: false
            };
        } else {
            result = {
                text,
                end_session: false
            };
        }

        return result;
    };

    /**
     *
     * @param arr
     *
     *  @returns {*}
     */
    private static getRandomElement(arr: string[]) {
        const index = Math.floor(Math.random() * arr.length);

        return arr[index];
    }
}