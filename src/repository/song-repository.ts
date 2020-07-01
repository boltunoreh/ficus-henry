import Song from "../model/song";
import {ISong} from "../types/interfaces";

export class SongRepository {
    async findOneByAlias(alias: string): Promise<ISong> {
        return await Song.findOne({alias}).exec();
    }

    async getAllSongNames(): Promise<Array<string>> {
        const songNames: string[] = [];
        const cursor = Song.find().cursor();

        await cursor.eachAsync((doc: ISong) => {
            songNames.push(doc.name);
        });

        return songNames;
    }
}