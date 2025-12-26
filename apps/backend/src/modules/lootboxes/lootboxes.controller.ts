import {Request, Response} from "express";
import {requireAuthUser} from "@modules/auth/auth.guard";
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
    const user = requireAuthUser(req);

    const skinOwnership = await lootboxesService.open(user);

    res.json(skinOwnership);
}