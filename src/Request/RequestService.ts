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
     *
     * `audience`, when provided, is enforced against the token's `aud` claim
     * (via jsonwebtoken's `audience` verify option) — omit to accept any audience.
     */
    populate(request: any, audience?: string | string[]): any
    {
        const authTokenData = this.authService.getTokenDataFromRequest(request, audience)

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
