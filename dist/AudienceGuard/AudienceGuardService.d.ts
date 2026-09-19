export declare class AudienceGuardService {
    private allowedAudiences;
    constructor(allowedAudiences: string[]);
    ensureIfPresent: (req: any, res: any, next: any) => void;
}
