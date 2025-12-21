import {Router, Request, Response} from "express";
import {skinService} from "./skin.service";

export const skinsRouter = Router();

skinsRouter.get("/", async (req: Request, res: Response) => {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });
    res.json(result);
});