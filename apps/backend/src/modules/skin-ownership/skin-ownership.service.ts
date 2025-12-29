import {GrantSkinInput, PaginatedResult, Pagination, PaginationInput} from "@shared";
import {SkinOwnership, skinOwnershipRepository, SkinOwnershipSourceValues, toDomain} from "@modules/skin-ownership";
import {User, UserRoleValues} from "@modules/users";
import {AuthorizationError, BadRequestError} from "@errors";

async function getPaginatedUserSkins(requester: User, targetUserId: number, input: PaginationInput): Promise<PaginatedResult<SkinOwnership>> {
    if (requester.role === UserRoleValues.PLAYER && requester.id !== targetUserId)
        throw new AuthorizationError("Players can only view own skins");

    const pagination = Pagination.from(input);
    const [skins, total] = await Promise.all([
        skinOwnershipRepository.findPageByUserId(targetUserId, pagination.limit, pagination.offset),
        skinOwnershipRepository.countAllByUserId(targetUserId)
    ]);
    return {meta: pagination.meta(total), data: skins.map(toDomain)};
}

async function grantSkin(requester: User, input: GrantSkinInput): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can grant skins");

    try {
        await skinOwnershipRepository.grantSkin({
            userId: input.userId,
            skinId: input.skinId,
            source: SkinOwnershipSourceValues.ADMIN
        });
    } catch (err) {
        // TODO: catch only FK constraint violation error + rethrow unknown errors
        throw new BadRequestError("Failed to grant skin (user and/or skin not found)");
    }
}

export const skinOwnershipService = {
    getPaginatedUserSkins,
    grantSkin,
};