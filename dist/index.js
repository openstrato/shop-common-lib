"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaIntrospectionService = exports.AudienceEnum = void 0;
exports.commonLib = commonLib;
exports.scopesGuard = scopesGuard;
exports.audienceGuard = audienceGuard;
exports.rateLimiter = rateLimiter;
const GuardService_1 = require("./ScopesGuard/GuardService");
const AudienceGuardService_1 = require("./AudienceGuard/AudienceGuardService");
const RequestService_1 = require("./Request/RequestService");
const ResponseService_1 = require("./Response/ResponseService");
const EventBusService_1 = require("./EventBus/services/EventBusService");
const RedisService_1 = require("./Cache/infra/RedisService");
const RateLimitService_1 = require("./RateLimit/services/RateLimitService");
var AudienceEnum_1 = require("./Auth/enums/AudienceEnum");
Object.defineProperty(exports, "AudienceEnum", { enumerable: true, get: function () { return AudienceEnum_1.AudienceEnum; } });
var SchemaIntrospectionService_1 = require("./SchemaIntrospectionService/SchemaIntrospectionService");
Object.defineProperty(exports, "SchemaIntrospectionService", { enumerable: true, get: function () { return SchemaIntrospectionService_1.SchemaIntrospectionService; } });
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
function audienceGuard(allowedAudiences) {
    const audienceGuardService = new AudienceGuardService_1.AudienceGuardService(Array.isArray(allowedAudiences) ? allowedAudiences : [allowedAudiences]);
    return audienceGuardService;
}
function rateLimiter(keyPrefix, maxRequests, windowSeconds, options) {
    return new RateLimitService_1.RateLimitService(keyPrefix, maxRequests, windowSeconds, options);
}
