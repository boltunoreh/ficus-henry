import {SongRepository} from "../repository/song-repository";
import {AbstractRequestProcessor} from "./abstract-request-processor";

export abstract class AbstractSongRequestProcessor extends AbstractRequestProcessor {
    protected songRepository: SongRepository;

    constructor() {
        super();

        this.songRepository = new SongRepository();
    }
}