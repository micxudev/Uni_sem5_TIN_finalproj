import {db} from "@db/db.connection";
import {SkinModel} from "@modules/skins/skin.model";
import {SkinOwnershipSourceValues} from "@modules/skin-ownership/skin-ownership.source";
import {SkinOwnershipModel} from "@modules/skin-ownership/skin-ownership.model";
import {UnexpectedError} from "@errors/errors.general";

async function getLastLootboxOpenedAt(userId: number): Promise<string | null> {
    const sql = `
        SELECT last_lootbox_opened_at as last_open
        FROM users
        WHERE id = ?
    `;
    const row = await db.get<{ last_open: string | null }>(sql, [userId]);
    return row?.last_open ?? null;
}

async function getRandomSkin(): Promise<SkinModel | undefined> {
    const sql = `
        SELECT *
        FROM skins
        ORDER BY RANDOM()
        LIMIT 1
    `;
    return db.get<SkinModel>(sql);
}

async function grantSkin(userId: number, skinId: number): Promise<SkinOwnershipModel> {
    const sqlInsert = `
        INSERT INTO skin_ownerships (user_id, skin_id, source)
        VALUES (?, ?, ?)
        RETURNING id
    `;

    const insertedRow = await db.get<{ id: number }>(sqlInsert, [
        userId, skinId, SkinOwnershipSourceValues.LOOTBOX,
    ]);
    if (!insertedRow)
        throw new UnexpectedError("Failed to retrieve created skin-ownership using RETURNING");

    const sqlSelect = `
        SELECT so.id          AS ownership_id,
               so.source      as source,
               so.obtained_at as obtained_at,
               s.id           as skin_id,
               s.name         AS skin_name,
               s.rarity       AS skin_rarity,
               s.created_at   AS skin_created_at
        FROM skin_ownerships so
                 JOIN skins s ON s.id = so.skin_id
        WHERE so.id = ?
    `;

    const selectedRow = await db.get<SkinOwnershipModel>(sqlSelect, [insertedRow.id]);
    if (!selectedRow)
        throw new UnexpectedError("Failed to retrieve created skin-ownership using SELECT");

    return selectedRow;
}

async function updateLastLootboxOpenedAt(userId: number): Promise<boolean> {
    const sql = `
        UPDATE users
        SET last_lootbox_opened_at = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        WHERE id = ?
    `;
    const result = await db.run(sql, [userId]);
    return result.changes > 0;
}

export const lootboxesRepository = {
    getLastLootboxOpenedAt,
    getRandomSkin,
    grantSkin,
    updateLastLootboxOpenedAt,
};