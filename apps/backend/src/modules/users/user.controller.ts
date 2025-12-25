import {Request, Response} from "express";
import {userService} from "@modules/users/user.service";
import {NotFoundError} from "@errors/errors.http";

/**
 * ==========
 * `GET /api/users/`
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
    const id = Number(req.params.id);

    const result = await userService.getById(id);
    if (!result)
        throw new NotFoundError("User not found");

    res.json(result);
}