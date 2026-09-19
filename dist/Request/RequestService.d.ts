export declare class RequestService {
    private authService;
    private channelTokenService;
    private sessionRequestService;
    constructor();
    /**
     * Populates a request with additional info:
     * - user with scopes
     *
     * `audience`, when provided, is enforced against the token's `aud` claim
     * (via jsonwebtoken's `audience` verify option) — omit to accept any audience.
     */
    populate(request: any, audience?: string | string[]): any;
}
