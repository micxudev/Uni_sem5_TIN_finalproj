import {db} from "@db/db.connection";
import {hashPassword} from "@security/password";

/**
 * Inserts sample data into the database.
 * <p>
 * Safe to run on every app startup (uses INSERT OR IGNORE).
 */
export async function seedSampleData(): Promise<void> {
    // ----------< USERS >----------
    const adminHash = await hashPassword("admin123");
    const playerHash = await hashPassword("player123");

    await db.run(
        `
            INSERT OR IGNORE INTO users (id, username, password_hash, role)
            VALUES (1, 'admin', ?, 'ADMIN'),
                   (2, 'player', ?, 'PLAYER')
        `,
        [adminHash, playerHash]
    );

    // ----------< SKINS >----------
    await db.run(
        `
            INSERT OR IGNORE INTO skins (id, name, rarity)
            VALUES (1, 'CommonSkin', 'COMMON'),
                   (2, 'RareSkin', 'RARE'),
                   (3, 'LegendarySkin', 'LEGENDARY')
        `
    );

    // ----------< SKIN_OWNERSHIPS >----------
    await db.run(
        `
            INSERT OR IGNORE INTO skin_ownerships (id, user_id, skin_id, source)
            VALUES (1, 1, 1, 'ADMIN'),
                   (2, 1, 2, 'LOOTBOX'),
                   (3, 2, 2, 'ADMIN'),
                   (4, 2, 3, 'LOOTBOX')
        `
    );
}