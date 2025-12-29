import {PaginatedResult, Pagination, PaginationInput, Skin, SkinInput, User, UserRoleValues} from "@shared";
import {skinRepository, toDomain} from "@modules/skins";
import {AuthorizationError, NotFoundError} from "@errors";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<Skin>> {
    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinRepository.findPage(pagination.limit, pagination.offset),
        skinRepository.countAll()
    ]);
    return {meta: pagination.meta(total), data: skins.map(toDomain)};
}

async function getById(id: number): Promise<Skin> {
    const skin = await skinRepository.findById(id);
    if (!skin) throw new NotFoundError("Skin not found");
    return toDomain(skin);
}

async function create(requester: User, input: SkinInput): Promise<Skin> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can create skins");

    const createdSkin = await skinRepository.create(input, requester.id);
    return toDomain(createdSkin);
}

async function update(requester: User, id: number, input: SkinInput): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can update skins");

    const createdBy = await skinRepository.getCreatedBy(id);
    if (!createdBy) throw new NotFoundError("Skin not found");

    if (createdBy !== requester.id)
        throw new AuthorizationError("Only skins created by you can be updated");

    const updated = await skinRepository.update(id, input);
    if (!updated) throw new NotFoundError("Skin not found");
}

async function deleteById(requester: User, id: number): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can delete skins");

    const createdBy = await skinRepository.getCreatedBy(id);
    if (!createdBy) throw new NotFoundError("Skin not found");

    if (createdBy !== requester.id)
        throw new AuthorizationError("Only skins created by you can be deleted");

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