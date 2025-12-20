import {db} from "../db/db.connection";
import {User} from "./user.model";

export const userRepo = {
    async findById(id: number): Promise<User | undefined> {
        const sql = "SELECT * FROM users WHERE id = ?";
        return db.get<User>(sql, [id]);
    },

    async findByUsername(username: string): Promise<User | undefined> {
        const sql = "SELECT * FROM users WHERE username = ?";
        return db.get<User>(sql, [username]);
    },

    async create(user: Omit<User, "id">): Promise<User> {
        const sql = `
            INSERT INTO users(username, password_hash, role)
            VALUES (?, ?, ?)
        `;
        const result = await db.run(sql, [
            user.username,
            user.password_hash,
            user.role
        ]);
        return {id: result.lastID, ...user};
    },

    async updatePassword(id: number, passwordHash: string): Promise<void> {
        const sql = "UPDATE users SET password_hash = ? WHERE id = ?";
        await db.run(sql, [passwordHash, id]);
    },
};