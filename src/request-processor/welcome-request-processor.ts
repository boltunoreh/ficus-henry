import {AbstractRequestProcessor} from "./abstract-request-processor";
import {YandexRequest} from "../model/yandex-request";
import {ButtonTitleEnum} from "../types/enums";

export class WelcomeRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        const greeting = this.getRandomElement(['Привет', 'Здравствуйте']);

        return this.createResponse(
            `${greeting}! Я - ваш виртуальный путеводитель по творчеству группы Фикус Генри. Если что-то нужно - только попросите.`,
            '',
            [
                ButtonTitleEnum.WHAT_CAN_YOU_DO,
            ]);
    }
}