"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const SessionResponseService_1 = require("./SessionResponseService");
class ResponseService {
    constructor(sessionResponseService = new SessionResponseService_1.SessionResponseService()) {
        this.sessionResponseService = sessionResponseService;
    }
    prepare(request, response) {
        response = this.sessionResponseService.setSessionId(request, response);
        return response;
    }
}
exports.ResponseService = ResponseService;
