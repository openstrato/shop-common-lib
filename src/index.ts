import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";

export function commonLib()
{
    const requestService = new RequestService()
    const responseService = new ResponseService()

    const commonLib = {
        request: requestService,
        response: responseService,
    }

    return commonLib;
}

export function scopesGuard(requiredScopes: string[])
{
    const guardService = new GuardService(requiredScopes)

    return guardService
}
