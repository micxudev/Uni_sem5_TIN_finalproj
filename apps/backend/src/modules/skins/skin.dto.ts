import {SkinRarity} from "@modules/skins/skin-rarity";
import {SkinSource} from "@modules/skins/skin-source";

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

// TODO: extend with all columns
export interface PlayerSkinDto {
    name: string;
    rarity: SkinRarity;
    source: SkinSource;
    obtained_at: Date;
}