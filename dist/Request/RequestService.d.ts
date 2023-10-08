export declare class RequestService {
    private authService;
    constructor();
    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request: any): any;
}
