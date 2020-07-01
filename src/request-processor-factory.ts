import {HelpIntentRequestProcessor} from "./request-processor/help-intent-request-processor";
import {WelcomeRequestProcessor} from "./request-processor/welcome-request-processor";
import {InvalidRequestProcessor} from "./request-processor/invalid-request-processor";
import {SongInfoIntentRequestProcessor} from "./request-processor/song-info-intent-request-processor";
import {SongNavigationIntentRequestProcessor} from "./request-processor/song-navigation-intent-request-processor";
import {SongListIntentRequestProcessor} from "./request-processor/song-list-intent-request-processor";
import {BandHistoryIntentRequestProcessor} from "./request-processor/band-history-intent-request-processor";
import {EventsIntentRequestProcessor} from "./request-processor/events-intent-request-processor";
import {YandexRequest} from "./model/yandex-request";
import {IRequestProcessor} from "./types/interfaces";
import {ActionIntentEnum, IntentEnum} from "./types/enums";

export class RequestProcessorFactory {
    createProcessorService(yandexRequest: YandexRequest): IRequestProcessor {
        if (yandexRequest.isNew) {
            return new WelcomeRequestProcessor();
        }

        if (Object.keys(yandexRequest.intents).length) {
            return this.createIntentProcessor(yandexRequest);
        }

        return new InvalidRequestProcessor();
    }

    private createIntentProcessor(yandexRequest: YandexRequest) {
        const intents = yandexRequest.intents;

        if (IntentEnum.YANDEX_WHAT_CAN_YOU_DO in intents || IntentEnum.YANDEX_HELP in intents) {
            return new HelpIntentRequestProcessor();
        } else if (IntentEnum.ACTION in intents) {
            switch (intents.action.slots.action.value) {
                case ActionIntentEnum.LIST_SONGS:
                    return new SongListIntentRequestProcessor();
                case ActionIntentEnum.SONG_CHORDS:
                case ActionIntentEnum.SONG_TEXT:
                    return new SongInfoIntentRequestProcessor();
                case ActionIntentEnum.BAND_HISTORY:
                    return new BandHistoryIntentRequestProcessor();
                case ActionIntentEnum.EVENTS:
                    return new EventsIntentRequestProcessor();
            }
        } else if (IntentEnum.SONG_INFO in intents) {
            return new SongInfoIntentRequestProcessor();
        } else if (IntentEnum.SONG_NAVIGATION in intents) {
            return new SongNavigationIntentRequestProcessor();
        } else {
            return new InvalidRequestProcessor();
        }
    }
}