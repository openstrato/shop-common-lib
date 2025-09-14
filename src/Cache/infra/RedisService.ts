import { createClient, RedisClientType } from 'redis';
import CacheServiceInterface from '../interfaces/CacheServiceInterface';

export default class RedisService implements CacheServiceInterface
{
    private client?: RedisClientType;

    private async ensureConnected(): Promise<void> {
        if (!this.client) {
            this.client = createClient({
                url: process.env.CACHE_SERVER_URL,
            });
        }

        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async set(key: string, value: any, expirationInSeconds?: number): Promise<void> {
        await this.ensureConnected();
        if (expirationInSeconds) {
            await this.client.set(key, JSON.stringify(value), {
                EX: expirationInSeconds,
            });
        } else {
            await this.client.set(key, JSON.stringify(value));
        }
    }

    async incrementAndGetCounter(key: string, incrementBy: number = 1, expirationInSeconds?: number): Promise<number>
    {
        await this.ensureConnected();

        if (!expirationInSeconds) {
            return await this.client.incrBy(key, incrementBy)
        }

        const pipeline = this.client.multi()
        pipeline.incrBy(key, incrementBy)
        pipeline.expire(key, expirationInSeconds)
        const results = await pipeline.exec()
        const updatedCount = results[0]

        return updatedCount as number
    }

    async get<T>(key: string): Promise<T | null> {
        await this.ensureConnected();
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key: string): Promise<void> {
        await this.ensureConnected();
        await this.client.del(key);
    }

    async has(key: string): Promise<boolean> {
        await this.ensureConnected();
        const exists = await this.client.exists(key);
        return exists === 1;
    }

    async clear(): Promise<void> {
        await this.ensureConnected();
        await this.client.flushAll();
    }

    async connect(): Promise<void> {
        await this.ensureConnected();
    }

    async disconnect(): Promise<void> {
        if (this.client && this.client.isOpen) {
            await this.client.disconnect();
        }
    }

    async isConnected(): Promise<boolean> {
        return this.client ? this.client.isOpen : false;
    }
}
