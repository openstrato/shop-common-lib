"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopesGuard = exports.commonLib = void 0;
const GuardService_1 = require("./ScopesGuard/GuardService");
const RequestService_1 = require("./Request/RequestService");
function commonLib() {
    const requestService = new RequestService_1.RequestService();
    const commonLib = {
        request: requestService,
    };
    return commonLib;
}
exports.commonLib = commonLib;
function scopesGuard(requiredScopes) {
    const guardService = new GuardService_1.GuardService(requiredScopes);
    return guardService;
}
exports.scopesGuard = scopesGuard;
