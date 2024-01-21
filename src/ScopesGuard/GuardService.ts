export class GuardService
{
    constructor(
        private requiredScopes: string[]
    ) {}

    ensureScopes = (req, res, next) =>
    {
        if (req.user.scopes === undefined || req.user.scopes.length <= 0) {
            throw Error('No scopes acquired. Required scopes: ' + this.requiredScopes.join(', '))
        }

        const userScopesMap = req.user.scopes.reduce((accumulator, currentValue) => {
            return {...accumulator, [currentValue]: true}
        }, {});

        if (userScopesMap['admin']) {
            next()
            return
        }

        for (const requiredScope of this.requiredScopes) {
            if (!userScopesMap[requiredScope]) {
                throw Error('Missing scopes. Required scopes: ' + this.requiredScopes.join(', '))
            }
        }

        next()
    }
}
