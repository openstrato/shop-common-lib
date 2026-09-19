export class AudienceGuardService
{
    constructor(
        private allowedAudiences: string[]
    ) {}

    // Route-level guard, unlike scopesGuard/populate(): a request with no token stays
    // untouched (public routes remain public), this only rejects a token that IS present
    // but wasn't minted for one of the allowed audiences.
    ensure = (req, res, next) =>
    {
        if (req.user?.aud === undefined) {
            next()
            return
        }

        if (!this.allowedAudiences.includes(req.user.aud)) {
            res.status(401).json({ error: 'Invalid token audience' })
            return
        }

        next()
    }
}
