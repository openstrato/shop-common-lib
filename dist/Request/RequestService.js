"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const AuthService_1 = require("./AuthService");
class RequestService {
    constructor() {
        this.authService = new AuthService_1.AuthService();
    }
    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request) {
        const authTokenData = this.authService.getTokenDataFromAuthHeader(request.header('Authorization'));
        if (authTokenData) {
            request.user = authTokenData;
        }
        return request;
    }
}
exports.RequestService = RequestService;
