import {Request, Response} from "express";
import {IdParamSchema} from "@shared";
import {userService} from "@modules/users";
import {NotFoundError} from "@errors";
import {parseParamsOrThrow} from "@utils/parse-or-throw";

/**
 * ==========
 * `GET /api/users`
 * ==========
 */
export async function getPaginated(
    req: Request,
    res: Response
): Promise<void> {
    const result = await userService.getPaginated({
        page: req.query.page,
        size: req.query.size
    });

    res.json(result);
}

/**
 * ==========
 * `GET /api/users/:id`
 * ==========
 */
export async function getById(
    req: Request,
    res: Response
): Promise<void> {
    const {id} = parseParamsOrThrow(IdParamSchema, req);

    const result = await userService.getById(id);
    if (!result)
        throw new NotFoundError("User not found");

    res.json(result);
}