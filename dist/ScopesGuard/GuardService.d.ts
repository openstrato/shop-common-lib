export declare class GuardService {
    private requiredScopes;
    constructor(requiredScopes: string[]);
    ensureScopes: (req: any, res: any, next: any) => void;
}
