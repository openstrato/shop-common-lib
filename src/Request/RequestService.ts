import { AuthService } from "./AuthService";

export class RequestService
{
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request: any): any
    {
        const authTokenData = this.authService.getTokenDataFromAuthHeader(request.header('Authorization'))
        if (authTokenData) {
            request.user = authTokenData
        }

        return request
    }
}
