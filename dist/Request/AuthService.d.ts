export declare class AuthService {
    getTokenDataFromRequest(request: any, audience?: string | string[]): any | undefined;
    private getTokenDataFromAuthHeader;
    private getTokenDataFromJwt;
}
