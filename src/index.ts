import * as dotenv from "dotenv";
dotenv.config();

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
    const response = await requestProcessorService.process(yandexRequest);

    res.send(response);
});

const port: number = Number(process.env.PORT) || 3000;
app.listen(port);