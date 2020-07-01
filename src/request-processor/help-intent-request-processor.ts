import {YandexRequest} from "../dto/yandex-request";
import {AbstractRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class HelpIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createResponse(
            'Я могу перечислить песни группы, напомнить аккорды, зачитать текст, рассказать историю группы или рассказать о ближайших мероприятиях.',
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