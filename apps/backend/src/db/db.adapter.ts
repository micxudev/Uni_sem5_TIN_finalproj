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

    /**
     * Executes a function within a transaction context, ensuring that operations within it either
     * complete successfully or are rolled back in case of an error.
     *
     * @param fn - A function containing the transactional logic to execute.
     * It should return a promise of the result of the operation.
     * @return Promise that resolves with the result of the transaction if successful,
     *                      or rejects if the transaction fails or is rolled back.
     */
    transaction<T>(fn: () => Promise<T>): Promise<T>;

    /**
     * Closes the database connection and releases all resources.
     *
     * Intended to be called during graceful application shutdown.
     */
    close(): Promise<void>;
}