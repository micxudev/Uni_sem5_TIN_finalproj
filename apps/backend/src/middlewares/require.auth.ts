import {Request} from "express";
import {User} from "@modules/users/user.domain";
import {AuthenticationError} from "@errors/errors.http";

export function getAuthUserOrFail(req: Request): User {
    const user = req.session.user;
    if (!user)
        throw new AuthenticationError("Not authenticated");

    return user;
}