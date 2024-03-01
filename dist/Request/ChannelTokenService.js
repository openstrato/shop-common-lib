"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelTokenService = void 0;
const jwt = require('jsonwebtoken');
class ChannelTokenService {
    getTokenDataFromRequest(request) {
        let channelData;
        const channelTokenHeader = request.header('channel-token');
        if (channelTokenHeader !== undefined) {
            const tokenData = jwt.verify(channelTokenHeader, process.env.INTERNAL_TOKEN_SECRET);
            channelData = tokenData;
            if ((tokenData === null || tokenData === void 0 ? void 0 : tokenData.scopes) !== undefined) {
                channelData.scopes = tokenData.scopes.split(' ');
            }
        }
        return channelData;
    }
}
exports.ChannelTokenService = ChannelTokenService;
