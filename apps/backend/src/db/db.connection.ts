import {DbAdapter} from "@db/db.adapter";
import {sqliteDb} from "@db/db.sqlite";

/**
 * Singleton instance of the database adapter.
 *
 * Uses the SQLite adapter (`sqliteDb`) by default.
 *
 * To switch databases, replace it with another implementation of {@link DbAdapter}.
 */
export const db: DbAdapter = sqliteDb;