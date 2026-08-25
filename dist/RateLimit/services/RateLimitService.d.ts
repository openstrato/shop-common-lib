interface RateLimitOptionsInterface {
    keyResolver: (req: any) => string;
    skip?: (req: any) => boolean;
}
export declare class RateLimitService {
    private keyPrefix;
    private maxRequests;
    private windowSeconds;
    private options;
    constructor(keyPrefix: string, maxRequests: number, windowSeconds: number, options: RateLimitOptionsInterface);
    enforce: (req: any, res: any, next: any) => Promise<void>;
}
export {};
