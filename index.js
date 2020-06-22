const micro = require('micro');
const replies = require('./src/replies');

const server = micro(async (req, res) => {
    const {request, session, state} = await micro.json(req);
    const sessionState = state && state.session || {};

    const response = session.new
        ? replies.welcome()
        : checkAnswer(sessionState, request.nlu, request.command);

    return {
        response,
        session_state: sessionState,
        version: '1.0'
    };
});

/**
 * @param sessionState
 * @param nlu
 * @param command
 *
 *  @returns {{tts: string, buttons: [*], end_session: boolean, text: string}|{tts: string, end_session: boolean, text: string}|{end_session: boolean, text: string}}
 */
function checkAnswer(sessionState, nlu, command) {
    if ('YANDEX.WHAT_CAN_YOU_DO' in nlu.intents || 'YANDEX.HELP' in nlu.intents) {
        return replies.help('');
    }
    
    if ('song_info' in nlu.intents) {
        if (nlu.intents.song_info.slots.what.value === 'аккорды') {
            return replies.songChords(nlu.intents.song_info.slots.song.value);
        } else if (nlu.intents.song_info.slots.what.value === 'текст') {
            return replies.songText(nlu.intents.song_info.slots.song.value);
        }
    }

    if (/перечислить песни/i.test(command)) {
        return replies.listSongs();
    }

    return replies.invalid();
}

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

server.listen(port, () => console.log(`Server started on http://localhost:${port}`));
