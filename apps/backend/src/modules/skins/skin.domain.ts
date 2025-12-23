import {SkinRarity} from "@modules/skins/skin-rarity";

/**
 * Domain level skin.
 *
 * Used in services, controllers, business logic.
 */
export interface Skin {
    id: number;
    name: string;
    rarity: SkinRarity;
    createdAt: Date;
}