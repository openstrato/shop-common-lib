"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudienceGuardService = void 0;
class AudienceGuardService {
    constructor(allowedAudiences) {
        this.allowedAudiences = allowedAudiences;
        // Route-level guard, unlike scopesGuard/populate(): a request with no token stays
        // untouched (public routes remain public), this only rejects a token that IS present
        // but wasn't minted for one of the allowed audiences.
        this.ensure = (req, res, next) => {
            var _a;
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.aud) === undefined) {
                next();
                return;
            }
            if (!this.allowedAudiences.includes(req.user.aud)) {
                res.status(401).json({ error: 'Invalid token audience' });
                return;
            }
            next();
        };
    }
}
exports.AudienceGuardService = AudienceGuardService;
