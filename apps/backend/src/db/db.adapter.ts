/**
 * Defines a common interface for database adapters.
 *
 * Any database should implement it to provide a consistent API for executing queries.
 */
export interface DbAdapter {
    /**
     * Executes a query that modifies the database (INSERT, UPDATE, DELETE).
     * @param sql SQL query string
     * @param params Optional array of parameters to bind to the query
     * @returns Promise resolving to an object containing:
     *  - lastID: ID of the last inserted row (INSERT)
     *  - changes: number of rows affected (UPDATE, DELETE)
     */
    run(
        sql: string,
        params?: unknown[]
    ): Promise<{ lastID: number; changes: number }>;

    /**
     * Executes a query that returns a single row.
     * @param sql SQL query string
     * @param params Optional array of parameters to bind to the query
     * @returns Promise resolving to the first row of the result, or undefined if none found
     */
    get<T>(
        sql: string,
        params?: unknown[]
    ): Promise<T | undefined>;

    /**
     * Executes a query that returns multiple rows.
     * @param sql SQL query string
     * @param params Optional array of parameters to bind to the query
     * @returns Promise resolving to an array of rows
     */
    all<T>(
        sql: string,
        params?: unknown[]
    ): Promise<T[]>;
}