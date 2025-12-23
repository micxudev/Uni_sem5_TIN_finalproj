import {Router, Request, Response} from "express";
import {skinService} from "@modules/skins/skin.service";

export const skinsRouter = Router();

skinsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });
    res.json(result);
});

skinsRouter.get("/users/:userId", async (req: Request, res: Response): Promise<void> => {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({error: "Not authenticated"});
        return;
    }

    const targetUserId = Number(req.params.userId);
    const result = await skinService.getUserSkins(user, targetUserId);
    res.json(result);
});