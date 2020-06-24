/**
 * Welcome message
 */
exports.welcome = () => {
    const greeting = getRandomElement(['Привет', 'Здравствуйте']);

    return {
        text: `${greeting}! Я - ваш виртуальный путеводитель по творчеству группы Фикус Генри. Если что-то нужно - только попросите.`,
        buttons: [
            {title: 'Что ты умеешь?', hide: true},
        ],
        end_session: false
    };
};

exports.invalid = () => {
    return this.help('Простите, я вас не поняла.')
};

exports.help = (preText) => {
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

exports.getHelpText = () => {
    return 'Я могу перечислить песни группы, напомнить аккорды, зачитать текст, рассказать историю группы или рассказать о ближайших мероприятиях.';
};

exports.listSongs = () => {
    return {
        text: `Про наркоманов. Рай. Н1. Питер. МТЖ. Доктор. Алкоголь. Дура.`, // todo move to classes, add different names
        end_session: false
    };
};

/**
 * @param {String} songName
 *
 * @returns {{tts: *, end_session: boolean, text: *}}
 */
exports.songChords = (songName) => {
    let chords, chordsCount, tts, errorText;

    switch (songName) {
        case 'про наркоманов':
            chords = 'H C';
            chordsCount = 2;
            break;
        case 'рай':
            chords = 'D B(6)';
            chordsCount = 2;
            break;
        case 'алкоголь':
            chords = 'E F E H C G A';
            chordsCount = 6;
            break;
        default:
            errorText = 'Не могу знать, ведь такая песня еще не написана.'
    }

    if (errorText) {
        return this.reply(errorText);
    }

    if (chordsCount === 2) {
        tts = 'Это изи, их всего два. Как и во всех остальных песнях. ' + chords;
    } else if (chordsCount > 2 && chordsCount < 5) {
        tts = 'Тут стоит сосредоточиться, ведь их аж ' + chordsCount + '. Но я верю, ты справишься. ' + chords;
    } else {
        tts = 'Не знаю, готова ли ты, ведь если бы аккорды были ... а ..., то потребовось бы ... .' + chords;
    }

    return this.reply(chords, tts);
};

exports.songText = (songName) => {
    
};

/**
 * Reply
 *
 * @param {String} text
 * @param {String} tts
 */
exports.reply = (text, tts = '') => {
    let result = {
        text: text,
        end_session: false
    };
    
    if (tts !== '') {
        result.tts = tts
    }

    return result;
};

/**
 * 
 * @param arr
 *
 *  @returns {*}
 */
function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);

    return arr[index];
}
