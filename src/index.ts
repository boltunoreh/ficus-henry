import express from 'express';
import {Replies} from './replies';
import {Db} from './db-init';

const app = express();
const jsonParser = express.json();
const replyService = new Replies();

Db.connect();

app.post("/", jsonParser, async (req, res) => {
    let response;

    if (req.body.session.new) {
        response = replyService.welcome();
    } else {
        response = await replyService.process(
            req.body.request.command,
            req.body.request.nlu.intents,
            req.body.state.session.value
        );
    }

    res.send(response);
});

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on http://localhost:${port}`);
});