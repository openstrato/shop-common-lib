import EventPayloadInterface from "../interfaces/EventPayloadInterface";
export default class EventPayload<DataType, MetaType = undefined> implements EventPayloadInterface {
    data: DataType;
    meta?: MetaType;
    constructor(data: DataType, meta?: MetaType);
}
