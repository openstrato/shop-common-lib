import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";
export declare function commonLib(): {
    request: RequestService;
};
export declare function scopesGuard(requiredScopes: string[]): GuardService;
