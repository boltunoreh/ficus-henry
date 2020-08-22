export enum IntentEnum {
    YANDEX_WHAT_CAN_YOU_DO = 'YANDEX.WHAT_CAN_YOU_DO',
    YANDEX_HELP = 'YANDEX.HELP',
    ACTION = 'action',
    SONG_INFO = 'song_info',
    SONG_NAVIGATION = 'song_navigation',
}

export enum ActionIntentEnum {
    LIST_SONGS = 'list_songs',
    SONG_CHORDS = 'song_chords',
    SONG_TEXT = 'song_text',
    BAND_HISTORY = 'band_history',
    EVENTS = 'events',
}

export enum SongInfoTypeEnum {
    CHORDS = 'chords',
    TEXT = 'text',
    FULL_TEXT = 'full_text',
}

export enum SongNavigationIntentEnum {
    NEXT = 'next',
    PREVIOUS = 'previous',
    REPEAT = 'repeat',
    REPEAT_SONG = 'repeat_song',
    FULL_TEXT = 'full_text',
}

export enum ButtonTitleEnum {
    SONG_LIST = 'Перечислить песни',
    SONG_CHORDS = 'Напомнить аккорды',
    SONG_TEXT = 'Зачитать текст',
    BAND_HISTORY = 'История группы',
    EVENTS = 'Афиша',
    WHAT_CAN_YOU_DO = 'Что ты умеешь?',
    BACK = 'Назад',
    FORWARD = 'Дальше',
    REPEAT = 'Повторить',
    CHOOSE_ANOTHER_SONG = 'Выбрать другую песню',
    RESTART = 'Начать сначала',
    FULL_TEXT = 'Покажи весь текст',
}