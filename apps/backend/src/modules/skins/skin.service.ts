import {skinRepo} from "@modules/skins/skin.repo";
import {Skin} from "@modules/skins/skin.domain";
import * as mapper from "@modules/skins/skin.mapper";
import {PlayerSkinDto, CreateSkinDto, UpdateSkinDto} from "@modules/skins/skin.dto";
import {UserRole} from "@modules/users/user-role";
import {User} from "@modules/users/user.domain";
import {PaginationInput, PaginatedResult, Pagination} from "@middlewares/pagination";
import {AuthorizationError} from "@errors/errors";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<Skin>> {
    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinRepo.findPage(pagination.limit, pagination.offset),
        skinRepo.countAll()
    ]);
    return {meta: pagination.meta(total), data: skins.map(mapper.toDomain)};
}

async function getById(id: number): Promise<Skin | undefined> {
    const skin = await skinRepo.findById(id);
    return skin && mapper.toDomain(skin);
}

async function create(dto: CreateSkinDto): Promise<Skin> {
    const createdSkin = await skinRepo.create(dto);
    return mapper.toDomain(createdSkin);
}

async function update(dto: UpdateSkinDto): Promise<void> {
    const updated = await skinRepo.update(dto);
    if (!updated) throw new Error("Skin not found");
}

async function deleteById(id: number): Promise<void> {
    const deleted = await skinRepo.deleteById(id);
    if (!deleted) throw new Error("Skin not found");
}

async function getUserSkins(requester: User, targetUserId: number): Promise<PlayerSkinDto[]> {
    if (requester.role === UserRole.PLAYER && requester.id !== targetUserId)
        throw new AuthorizationError("Players can only view own skins");

    return skinRepo.findSkinsByUserId(targetUserId);
}

export const skinService = {
    getPaginated,
    getById,
    create,
    update,
    deleteById,
    getUserSkins,
};