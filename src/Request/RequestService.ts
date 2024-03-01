import { AuthService } from "./AuthService";
import { ChannelTokenService } from "./ChannelTokenService";

export class RequestService
{
    private authService: AuthService;

    private channelTokenService: ChannelTokenService;

    constructor() {
        this.authService = new AuthService()
        this.channelTokenService = new ChannelTokenService()
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
        }

        const channelData = this.channelTokenService.getTokenDataFromRequest(request)

        if (channelData) {
            request.channel = channelData
        }

        return request
    }
}
