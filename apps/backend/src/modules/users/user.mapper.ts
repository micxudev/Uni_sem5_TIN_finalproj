import {UserModel} from "@modules/users/user.model";
import {User} from "@modules/users/user.domain";

export function toDomain(model: UserModel): User {
    return {
        id: model.id,
        username: model.username,
        role: model.role,
        createdAt: new Date(model.created_at),
    };
}