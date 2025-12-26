import {skinOwnershipRepository} from "@modules/skin-ownership/skin-ownership.repository";
import {SkinOwnership} from "@modules/skin-ownership/skin-ownership.domain";
import * as mapper from "@modules/skin-ownership/skin-ownership.mapper";
import {GrantSkinDto} from "@modules/skin-ownership/skin-ownership.dto";
import {UserRoleValues} from "@modules/users/user-role";
import {User} from "@modules/users/user.domain";
import {AuthorizationError, BadRequestError} from "@errors/errors.http";

async function getUserSkins(requester: User, targetUserId: number): Promise<SkinOwnership[]> {
    if (requester.role === UserRoleValues.PLAYER && requester.id !== targetUserId)
        throw new AuthorizationError("Players can only view own skins");

    const skins = await skinOwnershipRepository.findSkinsByUserId(targetUserId);
    return skins.map(mapper.toDomain);
}

async function grantSkin(requester: User, dto: GrantSkinDto): Promise<void> {
    if (requester.role !== UserRoleValues.ADMIN)
        throw new AuthorizationError("Only admins can grant skins");

    try {
        await skinOwnershipRepository.grantSkin(dto);
    } catch (err) {
        // TODO: catch only FK constraint violation error + rethrow unknown errors
        throw new BadRequestError("Failed to grant skin (user and/or skin not found)");
    }
}

export const skinOwnershipService = {
    getUserSkins,
    grantSkin,
};