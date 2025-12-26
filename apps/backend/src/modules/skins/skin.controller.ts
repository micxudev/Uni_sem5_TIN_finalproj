import {Request, Response} from "express";
import {z} from "zod";
import {IdParamSchema, SkinInputSchema} from "@shared";
import {skinService} from "@modules/skins";
import {requireAuthUser} from "@modules/auth";
import {BadRequestError, NotFoundError} from "@errors";

/**
 * ==========
 * `GET /api/skins`
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
    const paramsResult = IdParamSchema.safeParse(req.params);
    if (!paramsResult.success)
        throw new BadRequestError("Invalid ID", z.flattenError(paramsResult.error));

    const skin = await skinService.getById(paramsResult.data.id);
    if (!skin)
        throw new NotFoundError("Skin not found");

    res.json(skin);
}

/**
 * ==========
 * `POST /api/skins`
 * ==========
 */
export async function create(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    const result = SkinInputSchema.safeParse(req.body);
    if (!result.success)
        throw new BadRequestError("Invalid Input", z.flattenError(result.error));

    const skin = await skinService.create(user, result.data);

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
    const user = requireAuthUser(req);

    const paramsResult = IdParamSchema.safeParse(req.params);
    if (!paramsResult.success)
        throw new BadRequestError("Invalid ID", z.flattenError(paramsResult.error));

    const bodyResult = SkinInputSchema.safeParse(req.body);
    if (!bodyResult.success)
        throw new BadRequestError("Invalid Input", z.flattenError(bodyResult.error));

    await skinService.update(user, paramsResult.data.id, bodyResult.data);

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
    const user = requireAuthUser(req);

    const paramsResult = IdParamSchema.safeParse(req.params);
    if (!paramsResult.success)
        throw new BadRequestError("Invalid ID", z.flattenError(paramsResult.error));

    await skinService.deleteById(user, paramsResult.data.id);

    res.json({success: true});
}