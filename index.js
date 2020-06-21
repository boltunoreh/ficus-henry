const micro = require('micro');
const replies = require('./src/replies');

const server = micro(async (req, res) => {
    const {request, session, state} = await micro.json(req);
    const sessionState = state && state.session || {};

    const response = session.new
        ? replies.welcome()
        : checkAnswer(sessionState, request.command);

    return {
        response,
        session_state: sessionState,
        version: '1.0'
    };
});

/**
 * @param sessionState
 * @param command
 *
 *  @returns {{tts: string, buttons: [*], end_session: boolean, text: string}|{tts: string, end_session: boolean, text: string}|{end_session: boolean, text: string}}
 */
function checkAnswer(sessionState, command) {
    if (/что ты умеешь/i.test(command) || /помощь/i.test(command)) {
        return replies.help('');
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
