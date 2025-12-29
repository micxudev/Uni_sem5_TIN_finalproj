import {SkinOwnershipSource} from "@shared";

export interface GrantSkinDto {
    userId: number
    skinId: number
    source: SkinOwnershipSource
}