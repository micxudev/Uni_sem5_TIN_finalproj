import sqlite3 from "sqlite3";

sqlite3.verbose();

const rawDb = new sqlite3.Database("db.sqlite", (err: Error | null) => {
    if (err) {
        console.error("Failed to connect to DB:", err.message);
        process.exit(1);
    }
    console.log("Connected to DB.");
});

rawDb.run("PRAGMA foreign_keys = ON");

export const db = {
    run(
        sql: string,
        params: unknown[] = []
    ): Promise<{ lastID: number; changes: number }> {
        return new Promise((resolve, reject) => {
            rawDb.run(
                sql,
                params,
                function (this: sqlite3.RunResult, err: Error | null) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        lastID: this.lastID,
                        changes: this.changes,
                    });
                }
            );
        });
    },

    get<T>(
        sql: string,
        params: unknown[] = []
    ): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            rawDb.get(sql, params, (err: Error | null, row: T) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);
            });
        });
    },

    all<T>(
        sql: string,
        params: unknown[] = []
    ): Promise<T[]> {
        return new Promise((resolve, reject) => {
            rawDb.all(sql, params, (err: Error | null, rows: T[]) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    },
};