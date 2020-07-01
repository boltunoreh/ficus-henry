import {YandexRequest} from "../dto/yandex-request";
import {AbstractRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class WelcomeRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        const greeting = this.getRandomElement(['Привет', 'Здравствуйте']);

        return this.createResponse(
            `${greeting}! Я - ваш виртуальный путеводитель по творчеству группы Фикус Генри. Если что-то нужно - только попросите.`,
            '',
            [
                {title: 'Что ты умеешь?', hide: true},
            ]);
    }
}