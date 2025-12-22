export interface DbAdapter {
    run(
        sql: string,
        params?: unknown[]
    ): Promise<{ lastID: number; changes: number }>;

    get<T>(
        sql: string,
        params?: unknown[]
    ): Promise<T | undefined>;

    all<T>(
        sql: string,
        params?: unknown[]
    ): Promise<T[]>;
}