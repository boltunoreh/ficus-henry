const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const replies = require('./lib/replies');
const dbConfig = require('./config/db');

const app = express();
const jsonParser = express.json();

let dbClient;

MongoClient.connect(dbConfig.url, function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("heroku_85klzkss").collection("songs");

    let port = process.env.PORT;
    if (port == null || port == '') {
        port = 3000;
    }

    app.listen(port, function () {
        console.log(`Server started on http://localhost:${port}`);
    });
});

app.post("/", jsonParser, function (request, response) {
    let command = request.body.request.command;
    let intents = request.body.request.nlu.intents;
            
    let text = '';

    // let songRepository = require('./lib/repository/song-repository');

    try {
        const collection = request.app.locals.collection;

        if ('song_info' in intents) {
            let song_info = intents.song_info.slots;
            let songName = song_info.song.value;
            let song = collection.findOne({"name": songName}, {}, (err, item) => {
                if (err) {
                    console.log(err);
                } else {
                    if (song_info.what.value === 'аккорды') {
                        response.send({
                            response: replies.reply(item.chords),
                            // session_state: sessionState,
                            version: '1.0'
                        });
                    } else if (song_info.what.value === 'текст') {
                        response.send({
                            response: replies.reply(item.text),
                            // session_state: sessionState,
                            version: '1.0'
                        });
                    } else {
                        response.send({
                            response: replies.invalid(),
                            // session_state: sessionState,
                            version: '1.0'
                        });
                    }
                }
            });

            let e = song;
        }

        if (/перечислить песни/i.test(command)) {
            // let songs = songRepository.getSongs(db);
            let songs = collection.find({});

            let songNames = [];
            songs.each(function (err, item) {
                if (item != null) {
                    songNames.push(item.name);
                } else {
                    text = songNames.join(', ');

                    response.send({
                        response: replies.reply(text),
                        // session_state: sessionState,
                        version: '1.0'
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    } finally {
        dbClient.close();
    }
});