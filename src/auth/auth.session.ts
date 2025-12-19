import {Request} from "express";
import {User} from "../users/user.model";

export function createSession(req: Request, user: User): void {
    req.session.userId = user.id;
    req.session.role = user.role;
}

export function destroySession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}