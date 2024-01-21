interface ScopeMapInterface
{
    [ScopeName: string]: boolean
}

export class GuardService
{
    constructor(
        private requiredScopes: string[]
    ) {}

    ensureAll = (req, res, next) =>
    {
        const userScopesMap = this.getScopesMap(req.user.scopes)

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

    ensureAtLeastOne = (req, res, next) =>
    {
        const userScopesMap = this.getScopesMap(req.user.scopes)

        if (userScopesMap['admin']) {
            next()
            return
        }

        for (const requiredScope of this.requiredScopes) {
            if (userScopesMap[requiredScope]) {
                next()
                return
            }
        }

        throw Error('Missing scopes. Required scopes: ' + this.requiredScopes.join(', '))
    }

    private getScopesMap(scopes: string[]): ScopeMapInterface
    {
        if (scopes === undefined || scopes.length <= 0) {
            throw Error('No scopes acquired. Required scopes: ' + this.requiredScopes.join(', '))
        }

        const scopesMap: ScopeMapInterface = scopes.reduce((accumulator, currentValue) => {
            return {...accumulator, [currentValue]: true}
        }, {});

        return scopesMap;
    }
}
