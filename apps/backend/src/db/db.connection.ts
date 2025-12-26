import {DbAdapter, sqliteDb} from "@db";

/**
 * Singleton instance of the database adapter.
 *
 * Uses the SQLite adapter (`sqliteDb`) by default.
 *
 * To switch databases, replace it with another implementation of {@link DbAdapter}.
 */
export const db: DbAdapter = sqliteDb;