import {Request, Response} from "express";
import {skinService} from "@modules/skins/skin.service";
import {getAuthUserOrFail} from "@middlewares/require.auth";
import {BadRequestError, NotFoundError} from "@errors/errors.http";
import {SkinRaritySchema} from "@modules/skins/skin-rarity";

/**
 * ==========
 * `GET /api/skins/`
 * ==========
 */
export async function getPaginated(
    req: Request,
    res: Response
): Promise<void> {
    const result = await skinService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });

    res.json(result);
}

/**
 * ==========
 * `GET /api/skins/:id`
 * ==========
 */
export async function getById(
    req: Request,
    res: Response
): Promise<void> {
    const id = Number(req.params.id);

    const result = await skinService.getById(id);
    if (!result)
        throw new NotFoundError("Skin not found");

    res.json(result);
}

/**
 * ==========
 * `POST /api/skins/`
 * ==========
 */
export async function create(
    req: Request,
    res: Response
): Promise<void> {
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
}

/**
 * ==========
 * `PUT /api/skins/:id`
 * ==========
 */
export async function update(
    req: Request,
    res: Response
): Promise<void> {
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
}

/**
 * ==========
 * `DELETE /api/skins/:id`
 * ==========
 */
export async function deleteById(
    req: Request,
    res: Response
): Promise<void> {
    const user = getAuthUserOrFail(req);

    const id = Number(req.params.id);

    await skinService.deleteById(user, id);

    res.json({success: true});
}