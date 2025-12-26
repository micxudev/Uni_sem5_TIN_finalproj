import {SkinOwnershipSource} from "@modules/skin-ownership";

export interface GrantSkinDto {
    userId: number
    skinId: number
    source: SkinOwnershipSource
}