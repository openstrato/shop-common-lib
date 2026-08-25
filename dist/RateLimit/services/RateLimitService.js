"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitService = void 0;
const index_1 = require("../../index");
class RateLimitService {
    constructor(keyPrefix, maxRequests, windowSeconds, options) {
        this.keyPrefix = keyPrefix;
        this.maxRequests = maxRequests;
        this.windowSeconds = windowSeconds;
        this.options = options;
        this.enforce = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if ((_b = (_a = this.options).skip) === null || _b === void 0 ? void 0 : _b.call(_a, req)) {
                next();
                return;
            }
            const key = `ratelimit:${this.keyPrefix}:${this.options.keyResolver(req)}`;
            const requestCount = yield (0, index_1.commonLib)().cache.incrementAndGetCounter(key, 1, this.windowSeconds);
            if (requestCount > this.maxRequests) {
                res.status(429).json({ message: 'Too many requests. Please try again later.' });
                return;
            }
            next();
        });
    }
}
exports.RateLimitService = RateLimitService;
