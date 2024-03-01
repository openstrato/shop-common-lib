const jwt = require('jsonwebtoken')

export interface ChannelTokenData
{
    channelId: string
    shopId: string
    orgId: string
    scopes: string[]
    aud: string
}

export class ChannelTokenService
{
    getTokenDataFromRequest(request: any): ChannelTokenData|undefined
    {
        let channelData: ChannelTokenData|undefined

        const channelTokenHeader = request.header('channel-token')

        if (channelTokenHeader !== undefined) {
            const tokenData: any = jwt.verify(
                channelTokenHeader,
                process.env.INTERNAL_TOKEN_SECRET
            )

            channelData = tokenData

            if (tokenData?.scopes !== undefined) {
                channelData.scopes = tokenData.scopes.split(' ')
            }
        }

        return channelData;
    }
}
