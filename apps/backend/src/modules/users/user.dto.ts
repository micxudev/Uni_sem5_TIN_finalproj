import {UserRole} from "@modules/users";

/**
 * Data required to create a user.
 *
 * Used by repository.
 */
export interface CreateUserDto {
    username: string;
    passwordHash: string;
    role: UserRole;
}