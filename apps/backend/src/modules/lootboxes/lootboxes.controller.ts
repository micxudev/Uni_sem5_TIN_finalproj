import {Request, Response} from "express";
import {getAuthUserOrFail} from "@middlewares/require.auth";
import {lootboxesService} from "@modules/lootboxes/lootboxes.service";

/**
 * ==========
 * `GET /api/lootboxes/open`
 * ==========
 */
export async function open(
    req: Request,
    res: Response
): Promise<void> {
    const user = getAuthUserOrFail(req);

    const skinOwnership = await lootboxesService.open(user);

    res.json(skinOwnership);
}