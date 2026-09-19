export declare class AudienceGuardService {
    private allowedAudiences;
    constructor(allowedAudiences: string[]);
    ensure: (req: any, res: any, next: any) => void;
}
