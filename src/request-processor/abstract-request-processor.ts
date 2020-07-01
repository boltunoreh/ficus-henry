import {YandexRequest} from "../dto/yandex-request";
import {SongRepository} from "../repository/song-repository";
import pino from "pino";

export interface IRequestProcessor {
    process(yandexRequest: YandexRequest): Promise<any>;
}

export abstract class AbstractRequestProcessor implements IRequestProcessor {
    private logger: any;

    constructor() {
        this.logger = pino({
            name: 'ficus-henry',
            level: "debug"
        });
    }

    abstract process(yandexRequest: YandexRequest): Promise<any>;

    protected getRandomElement(arr: string[]) {
        const index = Math.floor(Math.random() * arr.length);

        return arr[index];
    }

    protected createResponse(
        text: string,
        tts: string = '',
        buttons: Array<object> = [],
        sessionState: object = {},
        card: object = null
    ): object {
        if (tts === '') {
            tts = text;
        }

        return {
            response: {
                text: text,
                tts: tts,
                card: card,
                buttons: buttons,
                end_session: false
            },
            session_state: {
                value: sessionState
            },
            version: '1.0'
        };
    }

    protected createInvalidResponse(yandexRequest: YandexRequest): any {
        const text = this.getRandomElement([
            'Простите, я вас не поняла',
            'Не могли бы повторить?',
            'Кажется, мы говорим на ранзых языках'
        ]);

        this.logger.info(yandexRequest);

        return this.createResponse(
            text,
            '',
            [
                {title: 'Что ты умеешь?', hide: true}
            ]
        );
    }
}

export abstract class AbstractSongRequestProcessor extends AbstractRequestProcessor {
    protected songRepository: SongRepository;

    constructor() {
        super();

        this.songRepository = new SongRepository();
    }
}