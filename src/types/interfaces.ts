import {Document, Types} from "mongoose";
import {YandexRequest} from "../model/yandex-request";

export interface ISong extends Document {
    alias: string;
    name: string;
    chords: Types.Array<IChords>;
    text: Types.Array<string>;
}

export interface IChords {
    type: string;
    chords: string;
}

export interface IRequestProcessor {
    process(yandexRequest: YandexRequest): Promise<any>;
}