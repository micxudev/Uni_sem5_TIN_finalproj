import {UserRole} from "@shared";

/**
 * Represents a single row in the `users` table.
 *
 * 1:1 mapping with DB schema.
 */
export interface UserModel {
    id: number;
    username: string;
    password_hash: string;
    role: UserRole;
    created_at: string;
    last_lootbox_opened_at: string | null;
}