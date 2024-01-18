// import { verify } from 'jsonwebtoken'

export class AuthService
{
    getTokenDataFromRequest(request: any): any|undefined
    {
        let tokenData: any|undefined = undefined;
        const authHeader = request.header('Authorization')

        if (authHeader !== undefined) {
            tokenData = this.getTokenDataFromAuthHeader(authHeader)
        } else if (request.cookies.jwt !== undefined) {
            tokenData = this.getTokenDataFromJwt(request.cookies.jwt)
        }

        return tokenData
    }

    private getTokenDataFromAuthHeader(authHeader: string): any
    {
        if (!authHeader?.startsWith('Bearer ')) {
            return undefined
        }
        
        const jwt: string = authHeader.substring(7)
        return this.getTokenDataFromJwt(jwt)
    }

    private getTokenDataFromJwt(jwt: string): any
    {
        // testing 1
        const jsonwebtoken = require('jsonwebtoken')

        const tokenData: any = jsonwebtoken.verify(
            jwt,
            process.env.INTERNAL_TOKEN_SECRET
        )

        if (tokenData.scopes !== undefined) {
            const scopes: string[] = tokenData.scopes.split(' ')
            tokenData.scopes = scopes
        }

        return tokenData
    }
}
