import {db} from "../db/db.connection";
import {Skin} from "./skin.model";
import {PlayerSkinDto} from "./skin.dtos";

async function findById(id: number): Promise<Skin | undefined> {
    const sql = "SELECT * FROM skins WHERE id = ?";
    return db.get<Skin>(sql, [id]);
}

async function findPage(limit: number, offset: number): Promise<Skin[]> {
    const sql = "SELECT * FROM skins LIMIT ? OFFSET ?";
    return db.all<Skin>(sql, [limit, offset]);
}

async function findSkinsByUserId(userId: number): Promise<PlayerSkinDto[]> {
    const sql = `
        SELECT s.name, s.rarity, ps.source, ps.obtained_at
        FROM skins s
                 JOIN player_skins ps ON s.id = ps.skin_id
        WHERE ps.user_id = ?
        ORDER BY ps.obtained_at DESC;
    `;
    return db.all<PlayerSkinDto>(sql, [userId]);
}

async function countAll(): Promise<number> {
    const sql = "SELECT COUNT(*) as count FROM skins";
    const row = await db.get<{ count: number }>(sql);
    return row?.count ?? 0;
}

async function create(skin: Omit<Skin, "id">): Promise<Skin> {
    const sql = "INSERT INTO skins(name, rarity) VALUES (?, ?)";
    const result = await db.run(sql, [skin.name, skin.rarity]);
    return {id: result.lastID, ...skin};
}

async function update(skin: Skin): Promise<boolean> {
    const sql = "UPDATE skins SET name = ?, rarity = ? WHERE id = ?";
    const result = await db.run(sql, [skin.name, skin.rarity, skin.id]);
    return result.changes > 0;
}

async function deleteById(id: number): Promise<boolean> {
    const sql = "DELETE FROM skins WHERE id = ?";
    const result = await db.run(sql, [id]);
    return result.changes > 0;
}

export const skinRepo = {
    findById,
    findPage,
    findSkinsByUserId,
    countAll,
    create,
    update,
    deleteById,
};