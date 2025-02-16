import EventPayloadInterface from "../interfaces/EventPayloadInterface";

export default class EventPayload<DataType, MetaType = undefined> implements EventPayloadInterface
{
    constructor(
        public data: DataType,
        public meta?: MetaType,
    ) {}
}
