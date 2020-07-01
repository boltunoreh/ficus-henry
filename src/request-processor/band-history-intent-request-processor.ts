import {YandexRequest} from "../dto/yandex-request";
import {AbstractRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class BandHistoryIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createResponse(
            'Эта история стара как мир. В далеком 2019 собрались ребята поиграть музыку. Так и играют с тех пор.',
            '',
            [
                {title: 'Перечислить песни', hide: true},
                {title: 'Напомнить аккорды', hide: true},
                {title: 'Зачитать текст', hide: true},
                {title: 'История группы', hide: true},
                {title: 'Афиша', hide: true},
            ]
        );
    }
}