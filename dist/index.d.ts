import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";
import EventBusService from "./EventBus/services/EventBusService";
import CacheServiceInterface from "./Cache/interfaces/CacheServiceInterface";
export declare function commonLib(): {
    request: RequestService;
    response: ResponseService;
    eventBus: EventBusService<unknown>;
    cache: CacheServiceInterface;
};
export declare function scopesGuard(requiredScopes: string[]): GuardService;
