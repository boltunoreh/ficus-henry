import express from 'express';
import {Db} from './db-init';
import {YandexRequest} from "./dto/yandex-request";
import {RequestProcessorFabric} from "./request-processor/request-processor-fabric";

const app = express();
const jsonParser = express.json();
const requestProcessorFabric = new RequestProcessorFabric();

Db.connect();

/*
    todo show chords line by line
    todo add band photos 
    todo add YandexResponse class 
 */

app.post("/", jsonParser, async (req, res) => {
    const yandexRequest = new YandexRequest(req.body.session.new,
        req.body.request.nlu.intents,
        req.body.state.session.value,
        req.body.request.command
    );

    const requestProcessorService = requestProcessorFabric.createProcessorService(yandexRequest);
    let response = await requestProcessorService.process(yandexRequest);

    res.send(response);
});

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on http://localhost:${port}`);
});