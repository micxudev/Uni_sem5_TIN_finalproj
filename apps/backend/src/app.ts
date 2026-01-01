import express, {NextFunction, Request, Response} from "express";

import {createSessionMiddleware} from "@middlewares/session.middleware";
import {apiRouter} from "./api.routes";
import {CustomError} from "@errors";
import {ApiError, ErrorCodeValues} from "@shared";


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
app.use("/api", apiRouter);


// ----------< Errors >----------
app.use((_req: Request, res: Response) => {
    res.status(404).json({error: "Page Not Found"});
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
        // Invalid JSON body (from express.json)
        const apiError: ApiError = {
            success: false,
            error: {
                code: ErrorCodeValues.BAD_REQUEST,
                message: "Invalid JSON payload",
            }
        };
        res.status(400).json(apiError);
        return;
    }

    if (err instanceof CustomError) {
        err.sendJson(res);
        return;
    }

    const apiError: ApiError = {
        success: false,
        error: {
            code: ErrorCodeValues.INTERNAL_ERROR,
            message: "Internal Server Error",
        }
    };
    res.status(500).json(apiError);
    console.error(err);
});