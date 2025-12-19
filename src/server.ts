import express, {Request, Response, NextFunction} from "express";
import path from "path";
import session from "express-session";

const SQLiteStore = require("connect-sqlite3")(session);

import {send404, send500} from "./helpers/errors";
import {initSchema} from "./db/db.init-schema";
import {seedSampleData} from "./db/db.sample-data";
import {authRouter} from "./auth/auth.routes";


// ----------< DB init >----------
(async () => {
    try {
        await initSchema();
        await seedSampleData();
        console.log("Database setup completed.");
    } catch (err) {
        console.error("DB init failed:", err);
        process.exit(1);
    }
})();


// ----------< Constants >----------
const PORT = 3000;
const ROOT_DIR = process.cwd();


// ----------< App >----------
const app = express();
app.set("views", path.join(ROOT_DIR, "views"));
app.set("view engine", "ejs");


// ----------< Middleware >----------
app.use(express.static(path.join(ROOT_DIR, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// ----------< Session >----------
app.use(
    session({
        name: "sid",
        store: new SQLiteStore({
            db: "db.sqlite",
            table: "sessions"
        }),
        secret: process.env.SESSION_SECRET || "signing_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 15 // 15 mins
        },
    })
);


// ----------< Routes >----------
app.use("/auth", authRouter);


// ----------< Errors >----------
app.use((_req: Request, res: Response) => {
    return send404(res);
});

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
    return send500(res);
});


// ----------< Start >----------
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});