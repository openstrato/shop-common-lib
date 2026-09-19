import { GuardService } from "./ScopesGuard/GuardService";
import { AudienceGuardService } from "./AudienceGuard/AudienceGuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";
import EventBusService from "./EventBus/services/EventBusService";
import CacheServiceInterface from "./Cache/interfaces/CacheServiceInterface";
import { RateLimitService } from "./RateLimit/services/RateLimitService";
export { AudienceEnum } from "./Auth/enums/AudienceEnum";
export { SchemaIntrospectionService, FieldSchemaEntry } from "./SchemaIntrospectionService/SchemaIntrospectionService";
export declare function commonLib(): {
    request: RequestService;
    response: ResponseService;
    eventBus: EventBusService<unknown>;
    cache: CacheServiceInterface;
};
export declare function scopesGuard(requiredScopes: string[]): GuardService;
export declare function audienceGuard(allowedAudiences: string | string[]): AudienceGuardService;
export declare function rateLimiter(keyPrefix: string, maxRequests: number, windowSeconds: number, options: {
    keyResolver: (req: any) => string;
    skip?: (req: any) => boolean;
}): RateLimitService;
