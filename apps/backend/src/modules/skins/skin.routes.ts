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

skinsRouter.get("/users/:userId", async (req, res) => {
    const requesterId = req.session.userId;
    const requesterRole = req.session.role;
    if (!requesterId || !requesterRole)
        return res.status(401).json({error: "Not authenticated"});

    const targetUserId = Number(req.params.userId);

    const result = await skinService.getUserSkins({
        requesterId, requesterRole, targetUserId,
    });

    res.json(result);
});

skinsRouter.get("/me", async (req, res) => {
    const requesterId = req.session.userId;
    const requesterRole = req.session.role;
    if (!requesterId || !requesterRole)
        return res.status(401).json({error: "Not authenticated"});

    const result = await skinService.getUserSkins({
        requesterId, requesterRole, targetUserId: requesterId,
    });

    res.json(result);
});