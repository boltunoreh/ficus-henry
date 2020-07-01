import {Schema, model, Document, Types} from 'mongoose';
import {ISong} from "../types/interfaces";

export const SongSchema = new Schema({
    alias: {type: String, required: true},
    name: {type: String, required: true},
    chords: {type: [Object], required: true},
    text: {type: [String], required: true}
});

const Song = model<ISong>('Song', SongSchema);

export default Song;