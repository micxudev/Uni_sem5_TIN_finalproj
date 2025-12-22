import {userRepo} from "@modules/users/user.repo";
import {User} from "@modules/users/user.model";
import {UserRole} from "@modules/users/user-role";
import {hashPassword, verifyPassword, needsRehash, getDummyHash} from "@security/password";

async function registerUser(username: string, password: string): Promise<User> {
    const passwordHash = await hashPassword(password);
    return userRepo.create({
        username: username,
        password_hash: passwordHash,
        role: UserRole.PLAYER
    });
}

async function loginUser(username: string, password: string): Promise<User | null> {
    const user = await userRepo.findByUsername(username);

    const hashToCheck = user ? user.password_hash : getDummyHash();

    const validPassword = await verifyPassword(hashToCheck, password);
    if (!user || !validPassword) return null;

    if (needsRehash(user.password_hash)) {
        const newHash = await hashPassword(password);
        await userRepo.updatePassword(user.id, newHash);
        user.password_hash = newHash;
    }

    return user;
}

async function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await userRepo.findById(userId);
    if (!user)
        throw new Error("User not found");

    const validPassword = await verifyPassword(user.password_hash, currentPassword);
    if (!validPassword)
        throw new Error("Invalid current password");

    const newHash = await hashPassword(newPassword);
    await userRepo.updatePassword(userId, newHash);
}

export const authService = {
    registerUser,
    loginUser,
    changePassword,
};