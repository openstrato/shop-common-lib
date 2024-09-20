import { v4 as uuidv4 } from 'uuid'

export class SessionRequestService
{
    ensureSessionId(request: any): any
    {
        if (request?.signedCookies?.sessionId === undefined) {
            const sessionId = uuidv4()

            request.signedCookies.sessionId = sessionId
            return request
        }

        return request
    }
}
