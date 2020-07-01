import {YandexRequest} from "../dto/yandex-request";
import {AbstractRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class EventsIntentRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createResponse(
            'На ближайшее время мероприятий не запланировано, но все ещё впереди!',
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