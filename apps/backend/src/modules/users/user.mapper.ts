import {User, UserModel} from "@modules/users";

export function toDomain(model: UserModel): User {
    return {
        id: model.id,
        username: model.username,
        role: model.role,
        createdAt: new Date(model.created_at),
        lastLootboxOpenedAt: model.last_lootbox_opened_at ? new Date(model.last_lootbox_opened_at) : null,
    };
}