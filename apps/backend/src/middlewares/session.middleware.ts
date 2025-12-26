import session from "express-session";

const SQLiteStore = require("connect-sqlite3")(session);

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