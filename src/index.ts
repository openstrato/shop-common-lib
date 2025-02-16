import { GuardService } from "./ScopesGuard/GuardService";
import { RequestService } from "./Request/RequestService";
import { ResponseService } from "./Response/ResponseService";
import EventBusService from "./EventBus/services/EventBusService";

export function commonLib()
{
    const requestService = new RequestService()
    const responseService = new ResponseService()

    const eventBus = new EventBusService()

    const commonLib = {
        request: requestService,
        response: responseService,
        eventBus: eventBus,
    }

    return commonLib;
}

export function scopesGuard(requiredScopes: string[])
{
    const guardService = new GuardService(requiredScopes)

    return guardService
}
