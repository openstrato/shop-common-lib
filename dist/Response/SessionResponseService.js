"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionResponseService = void 0;
class SessionResponseService {
    setSessionId(request, response) {
        var _a, _b;
        if (((_a = request.signedCookies) === null || _a === void 0 ? void 0 : _a.sessionId) !== undefined) {
            response.cookie('sessionId', (_b = request.signedCookies) === null || _b === void 0 ? void 0 : _b.sessionId, {
                signed: true,
                httpOnly: true,
                sameSite: true,
                secure: true,
                maxAge: 3600 * 1000,
                // domain: 'carts.shop.localhost',
                path: '/',
            });
            // response.cookie('potato', 'calamari', {
            //     signed: false,
            //     httpOnly: true,
            //     sameSite: false,
            //     secure: false,
            //     maxAge: 3600 * 1000,
            //     domain: '.frontshop.localhost',
            //     path: '/',
            // })
            // response.cookie('pomodoro', 'tomato', {
            //     signed: false,
            //     httpOnly: true,
            //     sameSite: false,
            //     secure: false,
            //     maxAge: 3600 * 1000,
            //     domain: 'carts.shop.localhost',
            //     path: '/',
            // })
            return response;
        }
        return response;
    }
}
exports.SessionResponseService = SessionResponseService;
