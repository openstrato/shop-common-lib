import { createClient, RedisClientType } from 'redis';
import CacheServiceInterface from '../interfaces/CacheServiceInterface';

export default class RedisService implements CacheServiceInterface
{
    private client?: RedisClientType;

    private async ensureConnected(): Promise<void> {
        console.log('connecting... ' + process.env.CACHE_SERVER_URL);
        
        if (!this.client) {
            console.log('creating client...');
            
            this.client = createClient({
                url: process.env.CACHE_SERVER_URL,
            });
        }

        if (!this.client.isOpen) {
            console.log('connecting client...');
            
            await this.client.connect();
        }
    }

    async set(key: string, value: any, expirationInSeconds?: number): Promise<void> {
        await this.ensureConnected();
        if (expirationInSeconds) {
            console.log('setting expiring... ' + key + '...' + JSON.stringify(value));
            
            await this.client.set(key, JSON.stringify(value), {
                EX: expirationInSeconds,
            });
        } else {
            console.log('setting... ' + key + '...' + JSON.stringify(value));
            
            await this.client.set(key, JSON.stringify(value));
        }
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
