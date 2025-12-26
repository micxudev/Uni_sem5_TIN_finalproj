import {SkinRarity} from "@modules/skins";

/**
 * Represents a single row in the `skins` table.
 *
 * 1:1 mapping with DB schema.
 */
export interface SkinModel {
    id: number;
    name: string;
    rarity: SkinRarity;
    created_at: string;
}