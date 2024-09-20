"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRequestService = void 0;
const uuid_1 = require("uuid");
class SessionRequestService {
    ensureSessionId(request) {
        var _a;
        if (((_a = request === null || request === void 0 ? void 0 : request.signedCookies) === null || _a === void 0 ? void 0 : _a.sessionId) === undefined) {
            const sessionId = (0, uuid_1.v4)();
            request.signedCookies.sessionId = sessionId;
            return request;
        }
        return request;
    }
}
exports.SessionRequestService = SessionRequestService;
