import {db} from "./db.connection";
import {hashPassword} from "../security/password";

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
            INSERT OR IGNORE INTO users (username, password_hash, role)
            VALUES ('admin', ?, 'ADMIN'),
                   ('player', ?, 'PLAYER')
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

    // ----------< PLAYER_SKINS >----------
    await db.run(
        `
            INSERT OR IGNORE INTO player_skins (user_id, skin_id, source)
            VALUES (1, 1, 'ADMIN'),
                   (1, 2, 'LOOTBOX'),
                   (2, 2, 'ADMIN'),
                   (2, 3, 'LOOTBOX')
        `
    );
}