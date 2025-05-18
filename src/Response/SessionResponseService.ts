import { v4 as uuidv4 } from 'uuid'

export class SessionResponseService
{
    setSessionId(request: any, response: any): any
    {
        if (request.signedCookies?.sessionId !== undefined) {
            response.cookie('sessionId', request.signedCookies?.sessionId, {
                signed: true,
                httpOnly: true,
                sameSite: true,
                secure: true,
                maxAge: 3600 * 1000,
                // domain: 'carts.shop.localhost',
                path: '/',
            })

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

            return response
        }

        return response
    }
}
