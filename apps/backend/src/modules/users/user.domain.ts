import {UserRole} from "@modules/users";

/**
 * Domain-level user.
 *
 * Used in services, controllers, business logic.
 */
export interface User {
    id: number;
    username: string;
    role: UserRole;
    createdAt: Date;
    lastLootboxOpenedAt: Date | null;
}