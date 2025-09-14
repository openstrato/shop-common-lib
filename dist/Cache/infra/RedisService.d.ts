import CacheServiceInterface from '../interfaces/CacheServiceInterface';
export default class RedisService implements CacheServiceInterface {
    private client?;
    private ensureConnected;
    set(key: string, value: any, expirationInSeconds?: number): Promise<void>;
    incrementAndGetCounter(key: string, incrementBy?: number, expirationInSeconds?: number): Promise<number>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
}
