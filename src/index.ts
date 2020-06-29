import express from 'express';
import {Replies} from './replies';
import {getAllSongNames, findOneByName} from './repository/song-repository';

const app = express();
const jsonParser = express.json();

    const port: number = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started on http://localhost:${port}`);
    });

app.post("/", jsonParser, async (req, res) => {
    const command = req.body.request.command;
    const intents = req.body.request.nlu.intents;

    try {
        if ('song_info' in intents) {
            const songInfo = intents.song_info.slots;
            const songName = songInfo.song.value;
            const what = songInfo.what.value;
            const song = await findOneByName(songName);
            let response = {};

            if (what === 'аккорды') {
                response = Replies.reply(song.chords);
            } else if (what === 'текст') {
                response = Replies.reply(song.text);
            } else {
                response = Replies.invalid();
            }

            res.send({
                response,
                // session_state: sessionState,
                version: '1.0'
            });
        } else if (/перечислить песни/i.test(command)) {
            // const songs = collection.find({});
            const songNames = await getAllSongNames();

            res.send({
                response: Replies.reply(songNames),
                version: '1.0'
            });
        } else {
            res.send({
                response: Replies.invalid(),
                // session_state: sessionState,
                version: '1.0'
            });
        }
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        res.send({
            response: Replies.reply(err),
            // session_state: sessionState,
            version: '1.0'
        });
    }
});