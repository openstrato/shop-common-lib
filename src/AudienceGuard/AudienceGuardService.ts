export class AudienceGuardService
{
    constructor(
        private allowedAudiences: string[]
    ) {}

    // Name says it: only enforced if a token is present. A request with no token stays
    // untouched (public routes remain public) - this only rejects a token that IS present
    // but wasn't minted for one of the allowed audiences.
    ensureIfPresent = (req, res, next) =>
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
