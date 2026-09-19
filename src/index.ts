import { GuardService } from "./ScopesGuard/GuardService";
import { AudienceGuardService } from "./AudienceGuard/AudienceGuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";
import EventBusService from "./EventBus/services/EventBusService";
import RedisService from "./Cache/infra/RedisService";
import CacheServiceInterface from "./Cache/interfaces/CacheServiceInterface";
import { RateLimitService } from "./RateLimit/services/RateLimitService";

export { AudienceEnum } from "./Auth/enums/AudienceEnum";
export { SchemaIntrospectionService, FieldSchemaEntry } from "./SchemaIntrospectionService/SchemaIntrospectionService";

export function commonLib()
{
    const requestService = new RequestService()
    const responseService = new ResponseService()

    const eventBus = new EventBusService()

    const cacheService: CacheServiceInterface = new RedisService()

    const commonLib = {
        request: requestService,
        response: responseService,
        eventBus: eventBus,
        cache: cacheService,
    }

    return commonLib;
}

export function scopesGuard(requiredScopes: string[])
{
    const guardService = new GuardService(requiredScopes)

    return guardService
}

export function audienceGuard(allowedAudiences: string | string[])
{
    const audienceGuardService = new AudienceGuardService(
        Array.isArray(allowedAudiences) ? allowedAudiences : [allowedAudiences]
    )

    return audienceGuardService
}

export function rateLimiter(
    keyPrefix: string,
    maxRequests: number,
    windowSeconds: number,
    options: { keyResolver: (req) => string, skip?: (req) => boolean },
)
{
    return new RateLimitService(keyPrefix, maxRequests, windowSeconds, options)
}
