import {SkinRarity} from "./skin-rarity.schema";

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
    createdBy: number;
}