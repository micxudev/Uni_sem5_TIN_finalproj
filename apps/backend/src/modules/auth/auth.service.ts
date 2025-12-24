import {userRepo} from "@modules/users/user.repo";
import {User} from "@modules/users/user.domain";
import * as mapper from "@modules/users/user.mapper";
import {UserRoleValues} from "@modules/users/user-role";
import {getDummyHash, hashPassword, needsRehash, verifyPassword} from "@security/password";

async function registerUser(username: string, password: string): Promise<User> {
    const passwordHash = await hashPassword(password);

    const createdUser = await userRepo.create({
        username, passwordHash, role: UserRoleValues.PLAYER
    });

    return mapper.toDomain(createdUser);
}

async function loginUser(username: string, password: string): Promise<User | null> {
    const user = await userRepo.findByUsername(username);

    const hashToCheck = user ? user.password_hash : getDummyHash();

    const validPassword = await verifyPassword(hashToCheck, password);
    if (!user || !validPassword) return null;

    if (needsRehash(user.password_hash)) {
        const newHash = await hashPassword(password);
        const updated = await userRepo.updatePassword(user.id, newHash);
        if (!updated) throw new Error("Failed to update password hash");
        user.password_hash = newHash;
    }

    return mapper.toDomain(user);
}

async function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await userRepo.findById(userId);
    if (!user)
        throw new Error("User not found");

    const validPassword = await verifyPassword(user.password_hash, currentPassword);
    if (!validPassword)
        throw new Error("Invalid current password");

    const newHash = await hashPassword(newPassword);
    return userRepo.updatePassword(userId, newHash);
}

export const authService = {
    registerUser,
    loginUser,
    changePassword,
};