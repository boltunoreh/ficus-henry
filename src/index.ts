import express from 'express';
import {Db} from './db-init';
import {RequestProcessorFactory} from "./request-processor-factory";
import {YandexRequest} from "./model/yandex-request";

const app = express();
const jsonParser = express.json();
const requestProcessorFactory = new RequestProcessorFactory();

Db.connect();

app.post("/", jsonParser, async (req, res) => {
    const yandexRequest = new YandexRequest(req);

    const requestProcessorService = requestProcessorFactory.createProcessorService(yandexRequest);
    let response = await requestProcessorService.process(yandexRequest);

    res.send(response);
});

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on http://localhost:${port}`);
});