import { SessionResponseService } from "./SessionResponseService";

export class ResponseService
{
    constructor(
        private sessionResponseService = new SessionResponseService()
    ) {}

    prepare(request: any, response: any): any
    {
        response = this.sessionResponseService.setSessionId(request, response)

        return response
    }
}
