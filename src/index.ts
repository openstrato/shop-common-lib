import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";

export function commonLib()
{
    const requestService = new RequestService()

    const commonLib = {
        request: requestService,
    }

    return commonLib;
}

export function scopesGuard(requiredScopes: string[])
{
    const guardService = new GuardService(requiredScopes)

    return guardService
}
