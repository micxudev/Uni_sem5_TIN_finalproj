import {SkinRarity} from "./skin-rarity";
import {SkinSource} from "./skin-source";
import {UserRole} from "../users/user-role";

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