import {YandexRequest} from "../dto/yandex-request";
import {AbstractRequestProcessor, IRequestProcessor} from "./abstract-request-processor";

export class InvalidRequestProcessor extends AbstractRequestProcessor {
    process(yandexRequest: YandexRequest): any {
        return this.createInvalidResponse(yandexRequest);
    }
}