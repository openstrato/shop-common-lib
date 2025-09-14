export default interface CacheServiceInterface {
    set(key: string, value: any, expiresInSeconds?: number): Promise<void>;
    incrementAndGetCounter(key: string, incrementBy: number, expiresInSeconds?: number): Promise<number>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
}
