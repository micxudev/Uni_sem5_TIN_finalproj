import {db} from "@db";
import {hashPassword} from "@security/password";

/**
 * Inserts sample data into the database.
 * <p>
 * Safe to run on every app startup (uses INSERT OR IGNORE).
 */
export async function seedSampleData(): Promise<void> {
    // ----------< USERS >----------
    const adminHash = await hashPassword("admin123");
    const admin2Hash = await hashPassword("admin1234");
    const playerHash = await hashPassword("player123");
    const player2Hash = await hashPassword("player1234");

    await db.run(
        `
            INSERT OR IGNORE INTO users (id, username, password_hash, role)
            VALUES (1, 'admin', ?, 'ADMIN'),
                   (2, 'admin2', ?, 'ADMIN'),
                   (3, 'player', ?, 'PLAYER'),
                   (4, 'player2', ?, 'PLAYER');
        `,
        [adminHash, admin2Hash, playerHash, player2Hash]
    );

    // ----------< SKINS >----------
    await db.run(
        `
            INSERT OR IGNORE INTO skins (id, name, rarity, created_by)
            VALUES (1, 'Factory Black', 'COMMON', 1),
                   (2, 'Service Grey', 'COMMON', 1),
                   (3, 'Urban Pattern', 'COMMON', 1),
                   (4, 'Desert Eagle', 'COMMON', 1),
                   (5, 'Night Pattern', 'RARE', 2),
                   (6, 'Arctic Finish', 'RARE', 2),
                   (7, 'Woodland Pattern', 'RARE', 2),
                   (8, 'Corrosion Resistant', 'RARE', 2),
                   (9, 'Special Forces Issue', 'LEGENDARY', 1),
                   (10, 'Prototype Service Model', 'LEGENDARY', 1),
                   (11, 'Command Unit Issue', 'LEGENDARY', 1);
        `
    );

    // ----------< SKIN_OWNERSHIPS >----------
    await db.run(
        `
            INSERT OR IGNORE INTO skin_ownerships (id, user_id, skin_id, source)
            VALUES (1, 3, 7, 'ADMIN'),
                   (2, 1, 2, 'LOOTBOX'),
                   (3, 4, 9, 'ADMIN'),
                   (4, 2, 5, 'LOOTBOX'),
                   (5, 3, 1, 'ADMIN'),
                   (6, 1, 6, 'LOOTBOX'),
                   (7, 4, 3, 'ADMIN'),
                   (8, 2, 8, 'LOOTBOX'),
                   (9, 3, 10, 'ADMIN'),
                   (10, 1, 4, 'LOOTBOX'),
                   (11, 2, 11, 'ADMIN'),
                   (12, 4, 6, 'LOOTBOX'),
                   (13, 1, 9, 'ADMIN'),
                   (14, 3, 5, 'LOOTBOX'),
                   (15, 2, 7, 'ADMIN');
        `
    );
}