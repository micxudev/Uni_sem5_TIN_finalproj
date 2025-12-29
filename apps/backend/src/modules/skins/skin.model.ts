import {SkinRarity} from "@shared";

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
    created_by: number;
}