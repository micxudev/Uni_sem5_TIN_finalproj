import express, {NextFunction, Request, Response} from "express";

import {createSessionMiddleware} from "@middlewares/session.middleware";
import {authRouter} from "@modules/auth";
import {skinsRouter} from "@modules/skins";
import {usersRouter} from "@modules/users";
import {lootboxesRouter} from "@modules/lootboxes";
import {skinOwnershipsRouter} from "@modules/skin-ownership";
import {CustomError} from "@errors";


// ----------< App >----------
export const app = express();
//app.set("views", path.join(ROOT_DIR, "views"));
//app.set("view engine", "ejs");


// ----------< Middleware >----------
//app.use(express.static(path.join(ROOT_DIR, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(createSessionMiddleware());


// ----------< Routes >----------
app.use("/api/auth", authRouter);
app.use("/api/skins", skinsRouter);
app.use("/api/users", usersRouter);
app.use("/api/lootboxes", lootboxesRouter);
app.use("/api", skinOwnershipsRouter);


// ----------< Errors >----------
app.use((_req: Request, res: Response) => {
    res.status(404).json({error: "Page Not Found"});
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
        // Invalid JSON body (from express.json)
        res.status(400).json({error: "Invalid JSON payload"});
        return;
    }

    if (err instanceof CustomError) {
        err.sendJson(res);
        return;
    }

    res.status(500).json({error: "Internal Server Error"});
    console.error(err);
});