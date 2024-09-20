import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";
export declare function commonLib(): {
    request: RequestService;
    response: ResponseService;
};
export declare function scopesGuard(requiredScopes: string[]): GuardService;
