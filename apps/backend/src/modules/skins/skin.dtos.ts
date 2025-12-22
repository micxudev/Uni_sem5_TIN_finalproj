import {SkinRarity} from "@modules/skins/skin-rarity";
import {SkinSource} from "@modules/skins/skin-source";
import {UserRole} from "@modules/users/user-role";

export interface UserAccessContext {
    requesterId: number;
    requesterRole: UserRole;
    targetUserId: number;
}

export interface PlayerSkinDto {
    name: string;
    rarity: SkinRarity;
    source: SkinSource;
    obtained_at: Date;
}