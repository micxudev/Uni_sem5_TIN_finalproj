import {Request, Response} from "express";
import {ApiSuccess, IdParamSchema, PaginatedResult, PaginationInput, Skin, SkinInputSchema} from "@shared";
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

    const apiSuccess: ApiSuccess<PaginatedResult<Skin>> = {
        success: true,
        data: result
    };
    res.json(apiSuccess);
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

    const apiSuccess: ApiSuccess<Skin> = {
        success: true,
        data: skin
    };
    res.json(apiSuccess);
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

    const apiSuccess: ApiSuccess<Skin> = {
        success: true,
        data: skin
    };
    res.status(201).json(apiSuccess);
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

    const apiSuccess: ApiSuccess<void> = {
        success: true,
        data: undefined
    };
    res.json(apiSuccess);
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

    const apiSuccess: ApiSuccess<void> = {
        success: true,
        data: undefined
    };
    res.json(apiSuccess);
}