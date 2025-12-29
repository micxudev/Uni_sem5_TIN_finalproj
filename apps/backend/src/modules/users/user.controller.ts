import {Request, Response} from "express";
import {IdParamSchema, PaginationInput} from "@shared";
import {requireAuthUser} from "@modules/auth";
import {userService} from "@modules/users";
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
    const user = requireAuthUser(req);

    const paginationInput: PaginationInput = {
        page: req.query.page,
        size: req.query.size
    };

    const result = await userService.getPaginatedUsers(user, paginationInput);

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
    const user = requireAuthUser(req);

    const {id} = parseParamsOrThrow(IdParamSchema, req);

    const result = await userService.getUserById(user, id);

    res.json(result);
}