import EventBusInterface from "../interfaces/EventBusInterface";
import { EventEnum } from "../enums/EventEnum";
import EventHandlerInterface from "../interfaces/EventHandlerInterface";
import EventPayloadInterface from "../interfaces/EventPayloadInterface";
export default class EventBusService<PayloadType> implements EventBusInterface<PayloadType> {
    private nc?;
    sendEvent(subject: EventEnum, payload: EventPayloadInterface): Promise<void>;
    subscribe(subject: string, handler: EventHandlerInterface): Promise<void>;
    private connect;
    private disconnect;
}
