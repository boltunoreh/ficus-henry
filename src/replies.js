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
    return help('Простите, я вам не поняла.')
};

exports.help = (preText) => {
    return {
        text: `${preText} ${getHelpText()}`,
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
        text: `Про наркоманов. Рай. Н1. Питер. МТЖ. Доктор. Алкоголь. Дура.`, // todo randomize
        end_session: false
    };
};

/**
 * Reply
 *
 * @param {String} text
 */
exports.reply = (text) => {
    return {
        text: `${text}`,
        end_session: false
    };
};

/**
 * Повторяем фразу пользователя.
 *
 * @param {String} command
 */
exports.repeatUserCommand = command => {
  return {
    text: `Может это ты ${command}?`,
    tts: `Это ты ${command}, а я - Дадон!!<speaker audio="alice-sounds-game-loss-2.opus">`,
    buttons: [capitulateButton],
    end_session: false
  };
};

function getRandomElement(arr) {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}
