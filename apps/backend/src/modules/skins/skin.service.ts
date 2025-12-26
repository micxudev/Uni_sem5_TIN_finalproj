import {SkinInput} from "@shared";
import {Skin, skinRepository, toDomain} from "@modules/skins";
import {User, UserRoleValues} from "@modules/users";
import {PaginatedResult, Pagination, PaginationInput} from "@utils/pagination";
import {AuthorizationError, NotFoundError} from "@errors";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<Skin>> {
    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinRepository.findPage(pagination.limit, pagination.offset),
        skinRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: skins.map(toDomain)};
}

async function getById(id: number): Promise<Skin | undefined> {
    const skin = await skinRepository.findById(id);
    return skin && toDomain(skin);
}

async function create(requester: User, input: SkinInput): Promise<Skin> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can create skins");

    const createdSkin = await skinRepository.create(input);
    return toDomain(createdSkin);
}

async function update(requester: User, id: number, input: SkinInput): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can update skins");

    const updated = await skinRepository.update(id, input);
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