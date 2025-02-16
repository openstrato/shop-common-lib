import EventPayloadInterface from "../interfaces/EventPayloadInterface";
export default class Event {
    payload: EventPayloadInterface;
    constructor(payload: EventPayloadInterface);
}
