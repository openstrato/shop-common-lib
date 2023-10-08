"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonLib = void 0;
const RequestService_1 = require("./Request/RequestService");
function commonLib() {
    const requestService = new RequestService_1.RequestService();
    const commonLib = {
        request: requestService,
    };
    return commonLib;
}
exports.commonLib = commonLib;
