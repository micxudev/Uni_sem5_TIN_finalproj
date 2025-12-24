import {Router, Request, Response} from "express";
import {skinService} from "@modules/skins/skin.service";
import {getAuthUserOrFail} from "@middlewares/require.auth";
import {BadRequestError, NotFoundError} from "@errors/errors.http";
import {SkinRaritySchema} from "@modules/skins/skin-rarity";

export const skinsRouter = Router();

skinsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });
    res.json(result);
});

skinsRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const result = await skinService.getById(id);
    if (!result)
        throw new NotFoundError("Skin not found");

    res.json(result);
});

skinsRouter.post("/", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const {name, rarity} = req.body ?? {};

    if (typeof name !== "string" || typeof rarity !== "string")
        throw new BadRequestError("strings 'name' and 'rarity' are required");

    if (name.length < 3)
        throw new BadRequestError("name must be at least 3 chars.");

    const result = SkinRaritySchema.safeParse(rarity);
    if (!result.success)
        throw new BadRequestError("Invalid rarity");

    const skin = await skinService.create(user, {name, rarity: result.data});
    res.status(201).json(skin);
});

skinsRouter.put("/:id", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const id = Number(req.params.id);

    const {name, rarity} = req.body ?? {};

    if (typeof name !== "string" || typeof rarity !== "string")
        throw new BadRequestError("strings 'name' and 'rarity' are required");

    if (name.length < 3)
        throw new BadRequestError("name must be at least 3 chars.");

    const result = SkinRaritySchema.safeParse(rarity);
    if (!result.success)
        throw new BadRequestError("Invalid rarity");

    await skinService.update(user, {id, name, rarity: result.data});
    res.json({success: true})
});

skinsRouter.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const id = Number(req.params.id);

    await skinService.deleteById(user, id);
    res.json({success: true});
});

skinsRouter.get("/users/:userId", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const targetUserId = Number(req.params.userId);
    const result = await skinService.getUserSkins(user, targetUserId);
    res.json(result);
});