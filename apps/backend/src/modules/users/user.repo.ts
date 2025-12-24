import {db} from "@db/db.connection";
import {UserModel} from "@modules/users/user.model";
import {CreateUserDto} from "@modules/users/user.dto";
import {UnexpectedError} from "@errors/errors.general";

async function findById(id: number): Promise<UserModel | undefined> {
    const sql = "SELECT * FROM users WHERE id = ?";
    return db.get<UserModel>(sql, [id]);
}

async function findByUsername(username: string): Promise<UserModel | undefined> {
    const sql = "SELECT * FROM users WHERE username = ?";
    return db.get<UserModel>(sql, [username]);
}

async function create(dto: CreateUserDto): Promise<UserModel> {
    const sql = `
        INSERT INTO users(username, password_hash, role)
        VALUES (?, ?, ?)
        RETURNING *
    `;

    const row = await db.get<UserModel>(sql, [
        dto.username, dto.passwordHash, dto.role,
    ]);

    if (!row)
        throw new UnexpectedError("Failed to retrieve created user using RETURNING");

    return row;
}

async function updatePassword(id: number, passwordHash: string): Promise<boolean> {
    const sql = "UPDATE users SET password_hash = ? WHERE id = ?";
    const result = await db.run(sql, [passwordHash, id]);
    return result.changes > 0;
}

export const userRepo = {
    findById,
    findByUsername,
    create,
    updatePassword,
};