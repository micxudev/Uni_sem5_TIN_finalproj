import {skinRepo} from "./skin.repo";
import {Skin} from "./skin.model";
import {SkinRarity} from "./skin-rarity";
import {PaginationInput, PaginatedResult, Pagination} from "../common/pagination";

async function getPaginated(input: PaginationInput): Promise<PaginatedResult<Skin>> {
    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinRepo.findPage(pagination.limit, pagination.offset),
        skinRepo.countAll()
    ]);
    return {meta: pagination.meta(total), data: skins};
}

async function getById(id: number): Promise<Skin | undefined> {
    return skinRepo.findById(id);
}

async function create(data: Omit<Skin, "id">): Promise<Skin> {
    if (!data.name || data.name.trim().length < 3)
        throw new Error("Skin name must be at least 3 characters");

    if (!Object.values(SkinRarity).includes(data.rarity))
        throw new Error("Invalid skin rarity");

    return skinRepo.create(data);
}

async function update(skin: Skin): Promise<void> {
    if (!skin.name || skin.name.trim().length < 3)
        throw new Error("Skin name must be at least 3 characters");

    if (!Object.values(SkinRarity).includes(skin.rarity))
        throw new Error("Invalid skin rarity");

    const updated = await skinRepo.update(skin);
    if (!updated) throw new Error("Skin not found");
}

async function deleteById(id: number): Promise<void> {
    const deleted = await skinRepo.deleteById(id);
    if (!deleted) throw new Error("Skin not found");
}

export const skinService = {
    getPaginated,
    getById,
    create,
    update,
    deleteById,
};