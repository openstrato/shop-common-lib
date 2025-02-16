import { connect } from "@nats-io/transport-node";
import EventBusInterface from "../interfaces/EventBusInterface";
import { EventEnum } from "../enums/EventEnum";
import EventHandlerInterface from "../interfaces/EventHandlerInterface";
import EventPayloadInterface from "../interfaces/EventPayloadInterface";

export default class EventBusService<PayloadType> implements EventBusInterface<PayloadType>
{
    private nc? = undefined

    async sendEvent(subject: EventEnum, payload: EventPayloadInterface): Promise<void>
    {
        await this.connect()

        this.nc.publish(subject, JSON.stringify(payload))
    }

    async subscribe(subject: string, handler: EventHandlerInterface)
    {
        await this.connect()

        this.nc.subscribe(subject, {
            callback: (err, msg) => {
              if (err) {
                console.error(err.message)
              } else {
                const rawPayload = JSON.parse(msg.data) as EventPayloadInterface
                
                handler.handle(rawPayload)
              }
            },
          });
    }

    private async connect(): Promise<void>
    {
        if (this.nc !== undefined) {
            return 
        }

        const natsConfig = {
            name: "shop-message-broker",
            user: process.env.EVENT_BUS_USERNAME,
            pass: process.env.EVENT_BUS_PASSWORD,
            servers: [
                process.env.EVENT_BUS_URL,
            ]
        }

        console.log(natsConfig);
        
        this.nc = await connect(natsConfig)
    }

    private async disconnect(): Promise<void>
    {
        if (this.nc === undefined) {
            return 
        }

        await this.nc.close()
        this.nc = undefined
    }


}
