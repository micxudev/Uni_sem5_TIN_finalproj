import {Request, Response} from "express";
import {IdParamSchema, PaginationInput, SkinInputSchema} from "@shared";
import {requireAuthUser} from "@modules/auth";
import {skinService} from "@modules/skins";
import {parseBodyOrThrow, parseParamsOrThrow} from "@utils/parse-or-throw";

/**
 * ==========
 * `GET /api/skins`
 * ==========
 */
export async function getPaginated(
    req: Request,
    res: Response
): Promise<void> {
    const paginationInput: PaginationInput = {
        page: req.query.page,
        size: req.query.size
    };

    const result = await skinService.getPaginated(paginationInput);

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
    const {id} = parseParamsOrThrow(IdParamSchema, req);

    const skin = await skinService.getById(id);

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

    const parsedBody = parseBodyOrThrow(SkinInputSchema, req);

    const skin = await skinService.create(user, parsedBody);

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

    const {id} = parseParamsOrThrow(IdParamSchema, req);

    const parsedBody = parseBodyOrThrow(SkinInputSchema, req);

    await skinService.update(user, id, parsedBody);

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

    const {id} = parseParamsOrThrow(IdParamSchema, req);

    await skinService.deleteById(user, id);

    res.json({success: true});
}