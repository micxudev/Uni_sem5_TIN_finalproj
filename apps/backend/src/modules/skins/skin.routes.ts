import {Router, Request, Response} from "express";
import {skinService} from "@modules/skins/skin.service";
import {getAuthUserOrFail} from "@middlewares/require.auth";

export const skinsRouter = Router();

skinsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });
    res.json(result);
});

skinsRouter.get("/users/:userId", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const targetUserId = Number(req.params.userId);
    const result = await skinService.getUserSkins(user, targetUserId);
    res.json(result);
});