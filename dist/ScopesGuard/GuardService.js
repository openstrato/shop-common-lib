"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardService = void 0;
class GuardService {
    constructor(requiredScopes) {
        this.requiredScopes = requiredScopes;
        this.ensureScopes = (req, res, next) => {
            if (req.user.scopes === undefined || req.user.scopes.length <= 0) {
                throw Error('No scopes acquired. Required scopes: ' + this.requiredScopes.join(', '));
            }
            const userScopesMap = req.user.scopes.reduce((accumulator, currentValue) => {
                return Object.assign(Object.assign({}, accumulator), { [currentValue]: true });
            }, {});
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
    }
}
exports.GuardService = GuardService;
