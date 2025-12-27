import {db} from "@db";

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
            id                     INTEGER PRIMARY KEY AUTOINCREMENT,
            username               TEXT NOT NULL UNIQUE,
            password_hash          TEXT NOT NULL,
            role                   TEXT NOT NULL CHECK (role IN ('PLAYER', 'ADMIN')),
            created_at             DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
            last_lootbox_opened_at DATETIME DEFAULT NULL
        )
    `);

    // ----------< SKINS >----------
    await db.run(`
        CREATE TABLE IF NOT EXISTS skins
        (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            rarity     TEXT    NOT NULL CHECK (rarity IN ('COMMON', 'RARE', 'LEGENDARY')),
            created_at DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
            created_by INTEGER NOT NULL,
            FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
        )
    `);

    // ----------< SKIN_OWNERSHIPS >----------
    await db.run(`
        CREATE TABLE IF NOT EXISTS skin_ownerships
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL,
            skin_id     INTEGER NOT NULL,
            source      TEXT    NOT NULL CHECK (source IN ('ADMIN', 'LOOTBOX')),
            obtained_at DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (skin_id) REFERENCES skins (id) ON DELETE CASCADE
        )
    `);
}