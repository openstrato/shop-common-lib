export declare class RequestService {
    private authService;
    private channelTokenService;
    private sessionRequestService;
    constructor();
    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request: any): any;
}
