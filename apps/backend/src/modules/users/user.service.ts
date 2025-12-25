import {userRepo} from "@modules/users/user.repo";
import {User} from "@modules/users/user.domain";
import * as mapper from "@modules/users/user.mapper";
import {PaginatedResult, Pagination, PaginationInput} from "@middlewares/pagination";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<User>> {
    const pagination = Pagination.from(input);
    const [users, total] = await Promise.all([
        userRepo.findPage(pagination.limit, pagination.offset),
        userRepo.countAll()
    ]);
    return {meta: pagination.meta(total), data: users.map(mapper.toDomain)};
}

async function getById(id: number): Promise<User | undefined> {
    const user = await userRepo.findById(id);
    return user && mapper.toDomain(user);
}

export const userService = {
    getPaginated,
    getById,
};