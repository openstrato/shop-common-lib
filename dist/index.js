"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = exports.commonLib = void 0;
const RequestService_1 = require("./Request/RequestService");
Object.defineProperty(exports, "RequestService", { enumerable: true, get: function () { return RequestService_1.RequestService; } });
function commonLib() {
    const requestService = new RequestService_1.RequestService();
    const commonLib = {
        request: requestService,
    };
    return commonLib;
}
exports.commonLib = commonLib;
