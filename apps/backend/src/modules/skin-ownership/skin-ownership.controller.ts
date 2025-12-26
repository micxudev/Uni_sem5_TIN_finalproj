import {Request, Response} from "express";
import {requireAuthUser} from "@modules/auth";
import {skinOwnershipService, SkinOwnershipSourceValues} from "@modules/skin-ownership";

/**
 * ==========
 * `GET /api/users/:userId/skin-ownerships`
 * ==========
 */
export async function getUserSkins(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    const targetUserId = Number(req.params.userId);

    const result = await skinOwnershipService.getUserSkins(user, targetUserId);

    res.json(result);
}

/**
 * ==========
 * `POST /api/skin-ownerships`
 * ==========
 */
export async function grantSkinToUser(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    let {userId, skinId} = req.body ?? {};
    userId = Number(userId);
    skinId = Number(skinId);

    await skinOwnershipService.grantSkin(user, {userId, skinId, source: SkinOwnershipSourceValues.ADMIN});

    res.json({success: true});
}