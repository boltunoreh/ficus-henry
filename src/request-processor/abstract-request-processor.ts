import {SongRepository} from "../repository/song-repository";
import pino from "pino";
import {YandexRequest} from "../model/yandex-request";
import {IRequestProcessor} from "../types/interfaces";
import {Button} from "../model/button";
import {ButtonService} from "../service/button-service";
import {ButtonTitleEnum} from "../types/enums";

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
        buttonTitles: string[] = [],
        sessionState: object = {},
        card: object = null
    ): object {
        if (tts === '') {
            tts = text;
        }

        let buttons = ButtonService.createButtons(buttonTitles);

        return {
            response: {
                text,
                tts,
                card,
                buttons,
                end_session: false
            },
            session_state: {
                value: sessionState
            },
            version: '1.0'
        };
    }

    protected createInvalidResponse(yandexRequest: YandexRequest): any {
        this.logger.info(yandexRequest);

        let variants = [
            'Простите, я вас не поняла',
            'Не могли бы повторить?',
            'Кажется, мы говорим на разных языках',
            'Будьте здоровы',
            'Хз, это не ко мне'
        ];

        if (yandexRequest.command.length < 10) {
            variants.push('Что ещё за ' + yandexRequest.command + '?');
        }

        const text = this.getRandomElement(variants);

        return this.createResponse(
            text,
            '',
            [ButtonTitleEnum.WHAT_CAN_YOU_DO]
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