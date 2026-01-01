import {Request, Response} from "express";
import {requireAuthUser} from "@modules/auth";
import {lootboxesService} from "@modules/lootboxes";
import {ApiSuccess, SkinOwnership} from "@shared";

/**
 * ==========
 * `GET /api/lootboxes/open`
 * ==========
 */
export async function open(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    const skinOwnership = await lootboxesService.open(user);

    const apiSuccess: ApiSuccess<SkinOwnership> = {
        success: true,
        data: skinOwnership
    };
    res.json(apiSuccess);
}