"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const AuthService_1 = require("./AuthService");
const ChannelTokenService_1 = require("./ChannelTokenService");
const SessionRequestService_1 = require("./SessionRequestService");
class RequestService {
    constructor() {
        this.authService = new AuthService_1.AuthService();
        this.channelTokenService = new ChannelTokenService_1.ChannelTokenService();
        this.sessionRequestService = new SessionRequestService_1.SessionRequestService();
    }
    /**
     * Populates a request with additional info:
     * - user with scopes
     */
    populate(request) {
        const authTokenData = this.authService.getTokenDataFromRequest(request);
        if (authTokenData) {
            request.user = authTokenData;
        }
        else {
            request = this.sessionRequestService.ensureSessionId(request);
        }
        const channelData = this.channelTokenService.getTokenDataFromRequest(request);
        if (channelData) {
            request.channel = channelData;
        }
        return request;
    }
}
exports.RequestService = RequestService;
