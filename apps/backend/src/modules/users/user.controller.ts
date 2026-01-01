import {Request, Response} from "express";
import {ApiSuccess, IdParamSchema, PaginatedResult, PaginationInput, User} from "@shared";
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

    const apiSuccess: ApiSuccess<PaginatedResult<User>> = {
        success: true,
        data: result
    };
    res.json(apiSuccess);
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

    const apiSuccess: ApiSuccess<User> = {
        success: true,
        data: result
    };
    res.json(apiSuccess);
}