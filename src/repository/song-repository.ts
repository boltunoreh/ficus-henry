import { connect } from 'mongoose';
import dbConfig from '../../config/db.json';
import Song, {ISong} from "../model/song";

connect(dbConfig.url, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Successfully Connected!");
    }
});

export async function findOneByName(name: string): Promise<ISong> {
    return await Song.findOne({name: name}).exec();
}

export async function getAllSongNames(): Promise<string> {
    const songNames: string[] = [];
    const cursor = Song.find().cursor();

    await cursor.eachAsync((doc: ISong) => {
        songNames.push(doc.name);
    });

    return songNames.join(', ');
}