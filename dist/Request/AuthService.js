"use strict";
// import { verify } from 'jsonwebtoken'
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
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
        console.log('testing 1');
        const jsonwebtoken = require('jsonwebtoken');
        const tokenData = jsonwebtoken.verify(jwt, process.env.INTERNAL_TOKEN_SECRET);
        if (tokenData.scopes !== undefined) {
            const scopes = tokenData.scopes.split(' ');
            tokenData.scopes = scopes;
        }
        return tokenData;
    }
}
exports.AuthService = AuthService;
