import {Skin, SkinModel} from "@modules/skins";

export function toDomain(model: SkinModel): Skin {
    return {
        id: model.id,
        name: model.name,
        rarity: model.rarity,
        createdAt: new Date(model.created_at),
        createdBy: model.created_by,
    };
}