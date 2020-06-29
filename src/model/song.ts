import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document{
    name: string;
    chords: string;
    text: string;
}

export const SongSchema = new Schema({
    name: {type:String, required: true},
    chords: {type:String, required: true},
    text: {type:String, required: true}
});

const Song = model<ISong>('Song', SongSchema);

export default Song;