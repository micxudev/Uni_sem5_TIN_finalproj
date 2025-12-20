import session from "express-session";
import {Request} from "express";
import {User} from "../users/user.model";

const SQLiteStore = require("connect-sqlite3")(session);

export function createSession(req: Request, user: User): void {
    req.session.userId = user.id;
    req.session.role = user.role;
}

export function destroySession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export function createSessionMiddleware() {
    return session({
        name: "sid",
        store: new SQLiteStore({db: "db.sqlite", table: "sessions"}),
        secret: process.env.SESSION_SECRET || "signing_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 15 // 15 mins
        },
    });
}