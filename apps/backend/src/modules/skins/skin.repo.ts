import {db} from "@db/db.connection";
import {SkinModel} from "@modules/skins/skin.model";
import {CreateSkinDto, PlayerSkinDto, UpdateSkinDto} from "@modules/skins/skin.dto";
import {UnexpectedError} from "@errors/errors.general";

async function findById(id: number): Promise<SkinModel | undefined> {
    const sql = "SELECT * FROM skins WHERE id = ?";
    return db.get<SkinModel>(sql, [id]);
}

async function findPage(limit: number, offset: number): Promise<SkinModel[]> {
    const sql = "SELECT * FROM skins LIMIT ? OFFSET ?";
    return db.all<SkinModel>(sql, [limit, offset]);
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

async function create(dto: CreateSkinDto): Promise<SkinModel> {
    const sql = "INSERT INTO skins(name, rarity) VALUES (?, ?) RETURNING *";

    const row = await db.get<SkinModel>(sql, [
        dto.name, dto.rarity
    ]);

    if (!row)
        throw new UnexpectedError("Failed to retrieve created skin using RETURNING");

    return row;
}

async function update(dto: UpdateSkinDto): Promise<boolean> {
    const sql = "UPDATE skins SET name = ?, rarity = ? WHERE id = ?";
    const result = await db.run(sql, [dto.name, dto.rarity, dto.id]);
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