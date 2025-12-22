import {db} from "./db.connection";

/**
 * Initializes database schema.
 * <p>
 * Safe to run on every app startup (uses IF NOT EXISTS).
 */
export async function initSchema(): Promise<void> {
    // ----------< USERS >----------
    await db.run(`
        CREATE TABLE IF NOT EXISTS users
        (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            username      TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role          TEXT NOT NULL CHECK (role IN ('PLAYER', 'ADMIN')),
            created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ----------< SKINS >----------
    await db.run(`
        CREATE TABLE IF NOT EXISTS skins
        (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT NOT NULL,
            rarity     TEXT NOT NULL CHECK (rarity IN ('COMMON', 'RARE', 'LEGENDARY')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ----------< PLAYER_SKINS >----------
    await db.run(`
        CREATE TABLE IF NOT EXISTS player_skins
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL,
            skin_id     INTEGER NOT NULL,
            source      TEXT    NOT NULL CHECK (source IN ('ADMIN', 'LOOTBOX')),
            obtained_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (skin_id) REFERENCES skins (id) ON DELETE CASCADE
        )
    `);
}