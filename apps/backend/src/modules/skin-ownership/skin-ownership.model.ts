import {SkinOwnershipSource, SkinRarity} from "@shared";

/**
 * Represents a single row in the `skin_ownerships` table joined with `skins`.
 */
export interface SkinOwnershipModel {
    ownership_id: number;
    source: SkinOwnershipSource;
    obtained_at: string;
    skin_id: number;
    skin_name: string;
    skin_rarity: SkinRarity;
    skin_created_at: string;
    skin_created_by: number;
}