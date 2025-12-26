import {SkinOwnershipModel} from "@modules/skin-ownership/skin-ownership.model";
import {db} from "@db/db.connection";
import {GrantSkinDto} from "@modules/skin-ownership/skin-ownership.dto";

async function findSkinsByUserId(userId: number): Promise<SkinOwnershipModel[]> {
    const sql = `
        SELECT so.id          as ownership_id,
               so.source      as source,
               so.obtained_at as obtained_at,
               s.id           as skin_id,
               s.name         as skin_name,
               s.rarity       as skin_rarity,
               s.created_at   as skin_created_at
        FROM skin_ownerships so
                 JOIN skins s ON s.id = so.skin_id
        WHERE so.user_id = ?
        ORDER BY so.obtained_at DESC;
    `;
    return db.all<SkinOwnershipModel>(sql, [userId]);
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
    findSkinsByUserId,
    grantSkin,
};