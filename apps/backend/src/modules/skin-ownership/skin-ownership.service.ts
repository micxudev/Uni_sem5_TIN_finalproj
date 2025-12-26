import {GrantSkinInput} from "@shared";
import {SkinOwnership, skinOwnershipRepository, SkinOwnershipSourceValues, toDomain} from "@modules/skin-ownership";
import {User, UserRoleValues} from "@modules/users";
import {AuthorizationError, BadRequestError} from "@errors";

async function getUserSkins(requester: User, targetUserId: number): Promise<SkinOwnership[]> {
    if (requester.role === UserRoleValues.PLAYER && requester.id !== targetUserId)
        throw new AuthorizationError("Players can only view own skins");

    const skins = await skinOwnershipRepository.findSkinsByUserId(targetUserId);
    return skins.map(toDomain);
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
    getUserSkins,
    grantSkin,
};