"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudienceGuardService = void 0;
class AudienceGuardService {
    constructor(allowedAudiences) {
        this.allowedAudiences = allowedAudiences;
        // Name says it: only enforced if a token is present. A request with no token stays
        // untouched (public routes remain public) - this only rejects a token that IS present
        // but wasn't minted for one of the allowed audiences.
        this.ensureIfPresent = (req, res, next) => {
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
