import {Schema, model, Document, Types} from 'mongoose';

export interface ISong extends Document {
    alias: string;
    name: string;
    chords: string;
    text: Types.Array<string>;
}

export const SongSchema = new Schema({
    alias: {type: String, required: true},
    name: {type: String, required: true},
    chords: {type: String, required: true},
    text: {type: [String], required: true}
});

const Song = model<ISong>('Song', SongSchema);

export default Song;