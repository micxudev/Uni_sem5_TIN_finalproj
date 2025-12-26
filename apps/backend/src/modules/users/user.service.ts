import {toDomain, User, userRepository} from "@modules/users";
import {PaginatedResult, Pagination, PaginationInput} from "@utils/pagination";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<User>> {
    const pagination = Pagination.from(input);
    const [users, total] = await Promise.all([
        userRepository.findPage(pagination.limit, pagination.offset),
        userRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: users.map(toDomain)};
}

async function getById(id: number): Promise<User | undefined> {
    const user = await userRepository.findById(id);
    return user && toDomain(user);
}

export const userService = {
    getPaginated,
    getById,
};