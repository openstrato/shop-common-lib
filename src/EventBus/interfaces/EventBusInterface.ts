import EventPayload from "./EventPayloadInterface"
import EventHandlerInterface from "./EventHandlerInterface"


export default interface EventBusInterface<PayloadType>
{
    sendEvent(subject, payload: EventPayload<PayloadType>): void
    subscribe(subject: string, handler: EventHandlerInterface<PayloadType>): void
}
