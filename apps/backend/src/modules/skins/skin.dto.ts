import {SkinRarity} from "@modules/skins/skin-rarity";
import {SkinSource} from "@modules/skins/skin-source";
import {UserRole} from "@modules/users/user-role";

/**
 * Data required to create a skin.
 *
 * Used by repository.
 */
export interface CreateSkinDto {
    name: string;
    rarity: SkinRarity;
}

/**
 * Data required to update a skin.
 *
 * Used by repository.
 */
export interface UpdateSkinDto {
    id: number;
    name: string;
    rarity: SkinRarity;
}

/**
 * Context of the user accessing protected resources.
 *
 * Used by services to enforce access control.
 */
export interface UserAccessContext {
    requesterId: number;
    requesterRole: UserRole;
    targetUserId: number;
}

// TODO: extend with all columns
export interface PlayerSkinDto {
    name: string;
    rarity: SkinRarity;
    source: SkinSource;
    obtained_at: Date;
}