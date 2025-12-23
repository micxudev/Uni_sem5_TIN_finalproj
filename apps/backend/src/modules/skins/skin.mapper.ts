import {SkinModel} from "@modules/skins/skin.model";
import {Skin} from "@modules/skins/skin.domain";

export function toDomain(model: SkinModel): Skin {
    return {
        id: model.id,
        name: model.name,
        rarity: model.rarity,
        createdAt: new Date(model.created_at),
    };
}