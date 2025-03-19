export default interface CacheServiceInterface {
    set(key: string, value: any, expiresInSeconds?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
}
