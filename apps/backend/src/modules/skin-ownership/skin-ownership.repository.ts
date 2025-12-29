import {db} from "@db";
import {GrantSkinDto, SkinOwnershipModel} from "@modules/skin-ownership";

async function findPageByUserId(userId: number, limit: number, offset: number): Promise<SkinOwnershipModel[]> {
    const sql = `
        SELECT so.id          as ownership_id,
               so.source      as source,
               so.obtained_at as obtained_at,
               s.id           as skin_id,
               s.name         as skin_name,
               s.rarity       as skin_rarity,
               s.created_at   as skin_created_at,
               s.created_by   as skin_created_by
        FROM skin_ownerships so
                 JOIN skins s ON s.id = so.skin_id
        WHERE so.user_id = ?
        ORDER BY so.obtained_at DESC
        LIMIT ? OFFSET ?;
    `;
    return db.all<SkinOwnershipModel>(sql, [userId, limit, offset]);
}

async function countAllByUserId(userId: number): Promise<number> {
    const sql = `
        SELECT COUNT(*) as count
        FROM skin_ownerships
        WHERE user_id = ?
    `;
    const row = await db.get<{ count: number }>(sql, [userId]);
    return row?.count ?? 0;
}

async function grantSkin(dto: GrantSkinDto): Promise<boolean> {
    const sql = `
        INSERT INTO skin_ownerships(user_id, skin_id, source)
        VALUES (?, ?, ?)
    `;

    const result = await db.run(sql, [
        dto.userId, dto.skinId, dto.source
    ]);

    return result.changes > 0;
}

export const skinOwnershipRepository = {
    findPageByUserId,
    countAllByUserId,
    grantSkin,
};