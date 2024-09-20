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
            var _a, _b, _c, _d;
            const userScopes = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.scopes) !== null && _b !== void 0 ? _b : [];
            const channelScopes = (_d = (_c = req.channel) === null || _c === void 0 ? void 0 : _c.scopes) !== null && _d !== void 0 ? _d : [];
            const scopesMap = this.getScopesMap([...userScopes, ...channelScopes]);
            if (scopesMap['admin']) {
                next();
                return;
            }
            for (const requiredScope of this.requiredScopes) {
                if (scopesMap[requiredScope]) {
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
