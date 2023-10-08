import jwt from 'jsonwebtoken';

export class AuthService
{
    getTokenDataFromAuthHeader(authHeader: string): any
    {
        if (!authHeader?.startsWith('Bearer ')) {
            return undefined;
        }
        
        const tokenData = jwt.verify(
            authHeader.substring(7),
            process.env.INTERNAL_TOKEN_SECRET
        )
    
        if (tokenData.scopes) {
            const scopes: string[] = tokenData.scopes.split(' ')
            tokenData.user.scopes = scopes
        }

        return tokenData
    }
}
