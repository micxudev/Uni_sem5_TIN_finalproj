import {skinRepository} from "@modules/skins/skin.repository";
import {Skin} from "@modules/skins/skin.domain";
import * as mapper from "@modules/skins/skin.mapper";
import {CreateSkinDto, UpdateSkinDto} from "@modules/skins/skin.dto";
import {UserRoleValues} from "@modules/users/user-role";
import {User} from "@modules/users/user.domain";
import {PaginationInput, PaginatedResult, Pagination} from "@middlewares/pagination";
import {AuthorizationError, NotFoundError} from "@errors/errors.http";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<Skin>> {
    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinRepository.findPage(pagination.limit, pagination.offset),
        skinRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: skins.map(mapper.toDomain)};
}

async function getById(id: number): Promise<Skin | undefined> {
    const skin = await skinRepository.findById(id);
    return skin && mapper.toDomain(skin);
}

async function create(requester: User, dto: CreateSkinDto): Promise<Skin> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can create skins");

    const createdSkin = await skinRepository.create(dto);
    return mapper.toDomain(createdSkin);
}

async function update(requester: User, dto: UpdateSkinDto): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can update skins");

    const updated = await skinRepository.update(dto);
    if (!updated) throw new NotFoundError("Skin not found");
}

async function deleteById(requester: User, id: number): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can delete skins");

    const deleted = await skinRepository.deleteById(id);
    if (!deleted) throw new NotFoundError("Skin not found");
}

export const skinService = {
    getPaginated,
    getById,
    create,
    update,
    deleteById,
};