"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const transport_node_1 = require("@nats-io/transport-node");
class EventBusService {
    constructor() {
        this.nc = undefined;
    }
    sendEvent(subject, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            this.nc.publish(subject, JSON.stringify(payload));
        });
    }
    subscribe(subject, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            this.nc.subscribe(subject, {
                callback: (err, msg) => {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        const rawPayload = JSON.parse(msg.data);
                        handler.handle(rawPayload);
                    }
                },
            });
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nc !== undefined) {
                return;
            }
            const natsConfig = {
                name: "shop-message-broker",
                user: process.env.EVENT_BUS_USERNAME,
                pass: process.env.EVENT_BUS_PASSWORD,
                servers: [
                    process.env.EVENT_BUS_URL,
                ]
            };
            console.log(natsConfig);
            this.nc = yield (0, transport_node_1.connect)(natsConfig);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nc === undefined) {
                return;
            }
            yield this.nc.close();
            this.nc = undefined;
        });
    }
}
exports.default = EventBusService;
