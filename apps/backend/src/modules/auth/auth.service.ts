import {toDomain, User, userRepository, UserRoleValues} from "@modules/users";
import {getDummyHash, hashPassword, needsRehash, verifyPassword} from "@security/password";
import {AuthenticationError, ConflictError, UnexpectedError} from "@errors";
import {AuthInput, ChangePasswordInput} from "@shared";

async function registerUser(input: AuthInput): Promise<User> {
    const passwordHash = await hashPassword(input.password);

    try {
        const createdUser = await userRepository.create({
            username: input.username, passwordHash, role: UserRoleValues.PLAYER
        });

        return toDomain(createdUser);
    } catch (err) {
        // TODO: catch only unique constraint violation error for username + rethrow unknown errors
        throw new ConflictError("Username already taken");
    }
}

async function loginUser(input: AuthInput): Promise<User> {
    const user = await userRepository.findByUsername(input.username);

    const hashToCheck = user ? user.password_hash : getDummyHash();

    const validPassword = await verifyPassword(hashToCheck, input.password);
    if (!user || !validPassword)
        throw new AuthenticationError("Invalid credentials");

    if (needsRehash(user.password_hash)) {
        const newHash = await hashPassword(input.password);
        const updated = await userRepository.updatePassword(user.id, newHash);
        if (!updated) throw new UnexpectedError("Failed to update password hash");
        user.password_hash = newHash;
    }

    return toDomain(user);
}

async function changePassword(userId: number, input: ChangePasswordInput): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user)
        throw new UnexpectedError("User no longer exists but requested to change password");

    const validPassword = await verifyPassword(user.password_hash, input.currentPassword);
    if (!validPassword)
        throw new AuthenticationError("Invalid current password");

    const newHash = await hashPassword(input.newPassword);
    const updated = await userRepository.updatePassword(userId, newHash);
    if (!updated)
        throw new UnexpectedError("User disappeared from DB during password verification");
}

export const authService = {
    registerUser,
    loginUser,
    changePassword,
};