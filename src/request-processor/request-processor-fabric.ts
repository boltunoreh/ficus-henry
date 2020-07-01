import {YandexRequest} from "../dto/yandex-request";
import {HelpIntentRequestProcessor} from "./help-intent-request-processor";
import {WelcomeRequestProcessor} from "./welcome-request-processor";
import {InvalidRequestProcessor} from "./invalid-request-processor";
import {SongInfoIntentRequestProcessor} from "./song-info-intent-request-processor";
import {SongNavigationIntentRequestProcessor} from "./song-navigation-intent-request-processor";
import {SongListIntentRequestProcessor} from "./song-list-intent-request-processor";
import {BandHistoryIntentRequestProcessor} from "./band-history-intent-request-processor";
import {EventsIntentRequestProcessor} from "./events-intent-request-processor";

export class RequestProcessorFabric {
    createProcessorService(yandexRequest: YandexRequest) {
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

        if ('YANDEX.WHAT_CAN_YOU_DO' in intents || 'YANDEX.HELP' in intents) { // todo move to enum
            return new HelpIntentRequestProcessor();
        } else if ('action' in intents) {
            switch (intents.action.slots.action.value) {
                case 'list_songs':
                    return new SongListIntentRequestProcessor();
                case 'song_chords':
                case 'song_text':
                    return new SongInfoIntentRequestProcessor();
                case 'band_history':
                    return new BandHistoryIntentRequestProcessor();
                case 'events':
                    return new EventsIntentRequestProcessor();
            }
        } else if ('song_info' in intents) {
            return new SongInfoIntentRequestProcessor();
        } else if ('song_navigation' in intents) {
            return new SongNavigationIntentRequestProcessor();
        } else {
            return new InvalidRequestProcessor();
        }
    }
}