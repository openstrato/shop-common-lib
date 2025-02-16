import EventPayloadInterface from "./EventPayloadInterface";

export default interface EventHandlerInterface
{
    handle(payload: EventPayloadInterface): void
}
