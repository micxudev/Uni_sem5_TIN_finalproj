import {Router, Request, Response} from "express";
import {skinService} from "@modules/skins/skin.service";

export const skinsRouter = Router();

skinsRouter.get("/", async (req: Request, res: Response) => {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });
    res.json(result);
});

skinsRouter.get("/users/:userId", async (req, res) => {
    const user = req.session.user;
    if (!user)
        return res.status(401).json({error: "Not authenticated"});

    const requesterId = user.id;
    const requesterRole = user.role;
    const targetUserId = Number(req.params.userId);

    const result = await skinService.getUserSkins({
        requesterId, requesterRole, targetUserId,
    });

    res.json(result);
});

skinsRouter.get("/me", async (req, res) => {
    const user = req.session.user;
    if (!user)
        return res.status(401).json({error: "Not authenticated"});

    const requesterId = user.id;
    const requesterRole = user.role;
    const targetUserId = requesterId;

    const result = await skinService.getUserSkins({
        requesterId, requesterRole, targetUserId,
    });

    res.json(result);
});