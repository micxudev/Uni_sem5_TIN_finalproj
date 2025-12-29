import {SkinOwnership, SkinOwnershipModel} from "@modules/skin-ownership";

export function toDomain(model: SkinOwnershipModel): SkinOwnership {
    return {
        ownershipId: model.ownership_id,
        source: model.source,
        obtainedAt: new Date(model.obtained_at),
        skin: {
            id: model.skin_id,
            name: model.skin_name,
            rarity: model.skin_rarity,
            createdAt: new Date(model.skin_created_at),
            createdBy: model.skin_created_by,
        },
    };
}