import {SkinOwnershipSource} from "@modules/skin-ownership/skin-ownership.source";

export interface GrantSkinDto {
    userId: number
    skinId: number
    source: SkinOwnershipSource
}