import sqlite3 from "sqlite3";
import {DbAdapter} from "@db/db.adapter";

sqlite3.verbose();

const filename = "db.sqlite";

const rawDb = new sqlite3.Database(filename, (err) => {
    if (err) {
        console.error("Failed to connect to DB:", err.message);
        process.exit(1);
    }
    console.log("Connected to DB.");
});

rawDb.run("PRAGMA foreign_keys = ON");

/**
 * SQLite implementation of {@link DbAdapter}.
 *
 * Wraps callback-based sqlite3 API with Promises to provide a consistent async interface.
 *
 * Features:
 *  - Enforces foreign key constraints
 *  - Uses a file {@link filename} as the database
 */

export const sqliteDb: DbAdapter = {
    run(
        sql: string,
        params: unknown[] = []
    ): Promise<{ lastID: number; changes: number }> {
        return new Promise((resolve, reject) => {
            rawDb.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({lastID: this.lastID, changes: this.changes});
            });
        });
    },

    get<T>(
        sql: string,
        params: unknown[] = []
    ): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            rawDb.get(sql, params, (err, row: T) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    all<T>(
        sql: string,
        params: unknown[] = []
    ): Promise<T[]> {
        return new Promise((resolve, reject) => {
            rawDb.all(sql, params, (err, rows: T[]) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            rawDb.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};