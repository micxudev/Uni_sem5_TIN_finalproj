import {UserRole} from "@modules/users/user-role";

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