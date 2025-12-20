import argon2 from "argon2";
import {userRepo} from "../users/user.repo";
import {User} from "../users/user.model";
import {UserRole} from "../users/user-role";

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1
};

const DUMMY_HASH = "$argon2id$v=19$m=65536,t=3,p=1$AAAAAAAAAAAAAAAAAAAAAA$BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";


export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
}

export async function needsRehash(hash: string): Promise<boolean> {
    return argon2.needsRehash(hash, ARGON2_OPTIONS);
}


export async function registerUser(username: string, password: string): Promise<User> {
    const passwordHash = await hashPassword(password);
    return userRepo.create({
        username: username,
        password_hash: passwordHash,
        role: UserRole.PLAYER
    });
}

export async function loginUser(username: string, password: string): Promise<User | null> {
    const user = await userRepo.findByUsername(username);

    const hashToCheck = user ? user.password_hash : DUMMY_HASH;

    const validPassword = await verifyPassword(hashToCheck, password);
    if (!user || !validPassword) return null;

    if (await needsRehash(user.password_hash)) {
        const newHash = await hashPassword(password);
        await userRepo.updatePassword(user.id, newHash);
        user.password_hash = newHash;
    }

    return user;
}

export async function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await userRepo.findById(userId);
    if (!user)
        throw new Error("User not found");

    const validPassword = await verifyPassword(user.password_hash, currentPassword);
    if (!validPassword)
        throw new Error("Invalid current password");

    const newHash = await hashPassword(newPassword);
    await userRepo.updatePassword(userId, newHash);
}