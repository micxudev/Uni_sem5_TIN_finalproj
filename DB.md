## Database Configuration

The application uses a pluggable **SQL-based database adapter** supporting:

- **SQLite** (default, no configuration needed)
- **MySQL** (via adapter implementation)
- **MongoDB** (not directly supported – see notes below about required architectural changes)

---

## Overview

All database access goes through a common interface: `src/db/db.adapter.ts`

```ts
export interface DbAdapter {
    run(sql: string, params?: unknown[]): Promise<{ lastID: number; changes: number }>;

    get<T>(sql: string, params?: unknown[]): Promise<T | undefined>;

    all<T>(sql: string, params?: unknown[]): Promise<T[]>;

    transaction<T>(fn: () => Promise<T>): Promise<T>;

    close(): Promise<void>;
}
```

---

## Default Database: SQLite

SQLite is used by default and requires **no configuration**.

#### 1. Database file: `db.sqlite`

#### 2. Adapter implementation: `src/db/db.sqlite.ts`

#### 3. Active connection selector: `src/db/db.connection.ts`

```ts
import {DbAdapter, sqliteDb} from "@db";

export const db: DbAdapter = sqliteDb;
```

---

## Switching to MySQL

1. Install MySQL driver `npm install mysql2`
2. Create `src/db/db.mysql.ts` implementing `DbAdapter`

Example structure:

```ts
import mysql from "mysql2/promise";
import {DbAdapter} from "@db";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const mysqlDb: DbAdapter = {
    async run(sql, params = []) {
        const [result] = await pool.execute<mysql.ResultSetHeader>(sql, params);
        return {
            lastID: result.insertId,
            changes: result.affectedRows,
        };
    },

    async get<T>(sql, params = []) {
        const [rows] = await pool.execute<T[]>(sql, params);
        return rows[0];
    },

    async all<T>(sql, params = []) {
        const [rows] = await pool.execute<T[]>(sql, params);
        return rows;
    },

    async transaction(fn) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await fn();
            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },

    async close() {
        await pool.end();
    },
};
```

3. Activate MySQL connection: `src/db/db.connection.ts`

```ts
import {DbAdapter, mysqlDb} from "@db";

export const db: DbAdapter = mysqlDb;
```

4. Configure environment variables, create or update `.env` file

```dotenv
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

---

## About MongoDB Support

> MongoDB is a **document-based NoSQL database**. While our adapter pattern theoretically allows for
> different database backends, switching to MongoDB would require **significant architectural changes**, not just a
> different adapter implementation.

### Key Differences:

1. **No SQL Support**: MongoDB uses BSON/JSON queries, not SQL statements
2. **Schema Design**: MongoDB encourages denormalized, embedded documents, not SQL's normalized tables
3. **Query Patterns**: Joins, transactions, and data relationships work fundamentally differently

### What Would Be Required:

To support MongoDB, one would need to:

1. **Redesign the Data Layer**: Create MongoDB-specific repositories/DAOs
2. **Use MongoDB Query Language**: Replace all SQL queries with MongoDB operations
3. **Rethink Schema**: Convert relational models to document models

---
