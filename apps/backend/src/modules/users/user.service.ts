import {toDomain, User, userRepository} from "@modules/users";
import {PaginatedResult, Pagination, PaginationInput} from "@utils/pagination";
import {NotFoundError} from "@errors";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<User>> {
    const pagination = Pagination.from(input);
    const [users, total] = await Promise.all([
        userRepository.findPage(pagination.limit, pagination.offset),
        userRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: users.map(toDomain)};
}

async function getById(id: number): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return toDomain(user);
}

export const userService = {
    getPaginated,
    getById,
};