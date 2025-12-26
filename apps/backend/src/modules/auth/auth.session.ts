import {Request} from "express";
import {User} from "@modules/users";

function create(req: Request, user: User): void {
    req.session.user = user;
}

function destroy(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export const sessionService = {
    create,
    destroy,
}