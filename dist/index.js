"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonLib = commonLib;
exports.scopesGuard = scopesGuard;
const GuardService_1 = require("./ScopesGuard/GuardService");
const RequestService_1 = require("./Request/RequestService");
const ResponseService_1 = require("./Response/ResponseService");
const EventBusService_1 = require("./EventBus/services/EventBusService");
const RedisService_1 = require("./Cache/infra/RedisService");
function commonLib() {
    const requestService = new RequestService_1.RequestService();
    const responseService = new ResponseService_1.ResponseService();
    const eventBus = new EventBusService_1.default();
    const cacheService = new RedisService_1.default();
    const commonLib = {
        request: requestService,
        response: responseService,
        eventBus: eventBus,
        cache: cacheService,
    };
    return commonLib;
}
function scopesGuard(requiredScopes) {
    const guardService = new GuardService_1.GuardService(requiredScopes);
    return guardService;
}
