import express, {Request, Response, NextFunction} from "express";

import {initSchema} from "./db/db.init-schema";
import {seedSampleData} from "./db/db.sample-data";
import {sessionService} from "./modules/auth/auth.session";
import {authRouter} from "./modules/auth/auth.routes";
import {skinsRouter} from "./modules/skins/skin.routes";
import {AuthorizationError} from "./errors/errors";


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
//const ROOT_DIR = process.cwd();

// ----------< App >----------
const app = express();
//app.set("views", path.join(ROOT_DIR, "views"));
//app.set("view engine", "ejs");


// ----------< Middleware >----------
//app.use(express.static(path.join(ROOT_DIR, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(sessionService.createMiddleware());


// ----------< Routes >----------
app.use("/auth", authRouter);
app.use("/skins", skinsRouter);


// ----------< Errors >----------
app.use((_req: Request, res: Response) => {
    res.status(404).json({error: "Page Not Found"});
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if ("body" in err) // Invalid JSON body (from express.json)
        return res.status(400).json({error: "Invalid JSON payload"});

    if (err instanceof AuthorizationError)
        return res.status(403).json({error: err.message});

    res.status(500).json({error: "Internal Server Error"});
});


// ----------< Start >----------
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});