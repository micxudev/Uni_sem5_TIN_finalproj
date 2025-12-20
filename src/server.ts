import express, {Request, Response, NextFunction} from "express";
import path from "path";

import {send404, send500} from "./helpers/errors";
import {initSchema} from "./db/db.init-schema";
import {seedSampleData} from "./db/db.sample-data";
import {sessionService} from "./auth/auth.session";
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

app.use(sessionService.createMiddleware());


// ----------< Routes >----------
app.use("/auth", authRouter);


// ----------< Errors >----------
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if ("body" in err)
        return res.status(400).json({error: "Invalid JSON payload"}); // Temp format
    next(err);
});
app.use((_req: Request, res: Response) => send404(res));
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => send500(res));


// ----------< Start >----------
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});