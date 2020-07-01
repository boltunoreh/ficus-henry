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
}

export enum ButtonTitleEnum {
    SONG_LIST = 'Перечислить песни',
    SONG_CHORDS = 'Напомнить аккорды',
    SONG_TEXT = 'Зачитать текст',
    BAND_HISTORY = 'История группы',
    EVENTS = 'Афиша',
    WHAT_CAN_YOU_DO = 'Что ты умеешь?',
}