import { AuthService } from "./AuthService";
import { ChannelTokenService } from "./ChannelTokenService";
import { SessionRequestService } from "./SessionRequestService";

export class RequestService
{
    private authService: AuthService;

    private channelTokenService: ChannelTokenService;

    private sessionRequestService: SessionRequestService;

    constructor() {
        this.authService = new AuthService()
        this.channelTokenService = new ChannelTokenService()
        this.sessionRequestService = new SessionRequestService()
    }

    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request: any): any
    {
        const authTokenData = this.authService.getTokenDataFromRequest(request)

        if (authTokenData) {
            request.user = authTokenData
        } else {
            request = this.sessionRequestService.ensureSessionId(request)
        }

        const channelData = this.channelTokenService.getTokenDataFromRequest(request)

        if (channelData) {
            request.channel = channelData
        }

        return request
    }
}
