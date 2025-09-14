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
const redis_1 = require("redis");
class RedisService {
    ensureConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                this.client = (0, redis_1.createClient)({
                    url: process.env.CACHE_SERVER_URL,
                });
            }
            if (!this.client.isOpen) {
                yield this.client.connect();
            }
        });
    }
    set(key, value, expirationInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            if (expirationInSeconds) {
                yield this.client.set(key, JSON.stringify(value), {
                    EX: expirationInSeconds,
                });
            }
            else {
                yield this.client.set(key, JSON.stringify(value));
            }
        });
    }
    incrementAndGetCounter(key_1) {
        return __awaiter(this, arguments, void 0, function* (key, incrementBy = 1, expirationInSecond) {
            yield this.ensureConnected();
            if (!expirationInSecond) {
                return yield this.client.incrBy(key, incrementBy);
            }
            const pipeline = this.client.multi();
            pipeline.incrBy(key, incrementBy);
            pipeline.expire(key, expirationInSecond);
            const results = yield pipeline.exec();
            const updatedCount = results[0];
            return updatedCount;
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            const value = yield this.client.get(key);
            return value ? JSON.parse(value) : null;
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            yield this.client.del(key);
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            const exists = yield this.client.exists(key);
            return exists === 1;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            yield this.client.flushAll();
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client && this.client.isOpen) {
                yield this.client.disconnect();
            }
        });
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client ? this.client.isOpen : false;
        });
    }
}
exports.default = RedisService;
