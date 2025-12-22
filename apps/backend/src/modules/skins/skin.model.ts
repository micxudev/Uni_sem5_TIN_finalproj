import {SkinRarity} from "./skin-rarity";

export interface Skin {
    id: number;
    name: string;
    rarity: SkinRarity;
}