"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    getTokenDataFromAuthHeader(authHeader) {
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            return undefined;
        }
        const tokenData = jwt.verify(authHeader.substring(7), process.env.INTERNAL_TOKEN_SECRET);
        if (tokenData.scopes) {
            const scopes = tokenData.scopes.split(' ');
            tokenData.user.scopes = scopes;
        }
        return tokenData;
    }
}
exports.AuthService = AuthService;
