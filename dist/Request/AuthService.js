"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    getTokenDataFromRequest(request) {
        let tokenData = undefined;
        const authHeader = request.header('Authorization');
        if (authHeader !== undefined) {
            tokenData = this.getTokenDataFromAuthHeader(authHeader);
        }
        else if (request.cookies.jwt !== undefined) {
            tokenData = this.getTokenDataFromJwt(request.cookies.jwt);
        }
        return tokenData;
    }
    getTokenDataFromAuthHeader(authHeader) {
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            return undefined;
        }
        const jwt = authHeader.substring(7);
        return this.getTokenDataFromJwt(jwt);
    }
    getTokenDataFromJwt(jwt) {
        const tokenData = (0, jsonwebtoken_1.verify)(jwt, process.env.INTERNAL_TOKEN_SECRET);
        if (tokenData.scopes !== undefined) {
            const scopes = tokenData.scopes.split(' ');
            tokenData.scopes = scopes;
        }
        return tokenData;
    }
}
exports.AuthService = AuthService;
