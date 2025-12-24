import {SkinRarity} from "@modules/skins/skin-rarity";

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