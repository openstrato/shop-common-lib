export declare class GuardService {
    private requiredScopes;
    constructor(requiredScopes: string[]);
    ensureAll: (req: any, res: any, next: any) => void;
    ensureAtLeastOne: (req: any, res: any, next: any) => void;
    private getScopesMap;
}
