import { commonLib } from "../../index";

interface RateLimitOptionsInterface
{
    keyResolver: (req) => string
    skip?: (req) => boolean
}

export class RateLimitService
{
    constructor(
        private keyPrefix: string,
        private maxRequests: number,
        private windowSeconds: number,
        private options: RateLimitOptionsInterface,
    ) {}

    enforce = async (req, res, next) =>
    {
        if (this.options.skip?.(req)) {
            next()
            return
        }

        const key = `ratelimit:${this.keyPrefix}:${this.options.keyResolver(req)}`
        const requestCount = await commonLib().cache.incrementAndGetCounter(key, 1, this.windowSeconds)

        if (requestCount > this.maxRequests) {
            res.status(429).json({ message: 'Too many requests. Please try again later.' })
            return
        }

        next()
    }
}
