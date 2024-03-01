export interface ChannelTokenData {
    channelId: string;
    shopId: string;
    orgId: string;
    scopes: string[];
    aud: string;
}
export declare class ChannelTokenService {
    getTokenDataFromRequest(request: any): ChannelTokenData | undefined;
}
