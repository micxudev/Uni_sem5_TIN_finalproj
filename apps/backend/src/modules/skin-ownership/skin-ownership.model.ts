import {SkinOwnershipSource} from "@modules/skin-ownership/skin-ownership-source";
import {SkinRarity} from "@modules/skins/skin-rarity";

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