import {userRepository} from "@modules/users/user.repository";
import {User} from "@modules/users/user.domain";
import * as mapper from "@modules/users/user.mapper";
import {PaginatedResult, Pagination, PaginationInput} from "@middlewares/pagination";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<User>> {
    const pagination = Pagination.from(input);
    const [users, total] = await Promise.all([
        userRepository.findPage(pagination.limit, pagination.offset),
        userRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: users.map(mapper.toDomain)};
}

async function getById(id: number): Promise<User | undefined> {
    const user = await userRepository.findById(id);
    return user && mapper.toDomain(user);
}

export const userService = {
    getPaginated,
    getById,
};