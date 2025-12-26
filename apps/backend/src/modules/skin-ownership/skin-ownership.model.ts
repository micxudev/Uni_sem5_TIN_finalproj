import {SkinRarity} from "@shared";
import {SkinOwnershipSource} from "@modules/skin-ownership";

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
}