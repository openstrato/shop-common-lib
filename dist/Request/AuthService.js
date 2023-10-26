"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    getTokenDataFromAuthHeader(authHeader) {
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            return undefined;
        }
        const tokenData = (0, jsonwebtoken_1.verify)(authHeader.substring(7), process.env.INTERNAL_TOKEN_SECRET);
        if (tokenData.scopes) {
            const scopes = tokenData.scopes.split(' ');
            tokenData.scopes = scopes;
        }
        return tokenData;
    }
}
exports.AuthService = AuthService;
