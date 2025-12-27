import {Request} from "express";
import {User} from "@modules/users";
import {AuthenticationError} from "@errors";

export function requireAuthUser(req: Request): User {
    const user = req.session.user;
    if (!user)
        throw new AuthenticationError("Not authenticated");

    return user;
}

export function requireNonAuthUser(req: Request): void {
    if (req.session.user)
        throw new AuthenticationError("Already authenticated");
}