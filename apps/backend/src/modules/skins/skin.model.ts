import {SkinRarity} from "@modules/skins/skin-rarity";

export interface Skin {
    id: number;
    name: string;
    rarity: SkinRarity;
}