import {PaginatedResult, Pagination, PaginationInput, User, UserRoleValues} from "@shared";
import {toDomain, userRepository} from "@modules/users";
import {AuthorizationError, NotFoundError} from "@errors";

async function getPaginatedUsers(requester: User, input: PaginationInput): Promise<PaginatedResult<User>> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can view all users");

    const pagination = Pagination.from(input);
    const [users, total] = await Promise.all([
        userRepository.findPage(pagination.limit, pagination.offset),
        userRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: users.map(toDomain)};
}

async function getUserById(requester: User, targetUserId: number): Promise<User> {
    if (requester.role === UserRoleValues.PLAYER && requester.id !== targetUserId)
        throw new AuthorizationError("Players can only view own profile");

    const user = await userRepository.findById(targetUserId);
    if (!user) throw new NotFoundError("User not found");
    return toDomain(user);
}

export const userService = {
    getPaginatedUsers,
    getUserById,
};