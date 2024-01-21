"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardService = void 0;
class GuardService {
    constructor(requiredScopes) {
        this.requiredScopes = requiredScopes;
        this.ensureAll = (req, res, next) => {
            const userScopesMap = this.getScopesMap(req.user.scopes);
            if (userScopesMap['admin']) {
                next();
                return;
            }
            for (const requiredScope of this.requiredScopes) {
                if (!userScopesMap[requiredScope]) {
                    throw Error('Missing scopes. Required scopes: ' + this.requiredScopes.join(', '));
                }
            }
            next();
        };
        this.ensureAtLeastOne = (req, res, next) => {
            const userScopesMap = this.getScopesMap(req.user.scopes);
            if (userScopesMap['admin']) {
                next();
                return;
            }
            for (const requiredScope of this.requiredScopes) {
                if (userScopesMap[requiredScope]) {
                    next();
                    return;
                }
            }
            throw Error('Missing scopes. Required scopes: ' + this.requiredScopes.join(', '));
        };
    }
    getScopesMap(scopes) {
        if (scopes === undefined || scopes.length <= 0) {
            throw Error('No scopes acquired. Required scopes: ' + this.requiredScopes.join(', '));
        }
        const scopesMap = scopes.reduce((accumulator, currentValue) => {
            return Object.assign(Object.assign({}, accumulator), { [currentValue]: true });
        }, {});
        return scopesMap;
    }
}
exports.GuardService = GuardService;
