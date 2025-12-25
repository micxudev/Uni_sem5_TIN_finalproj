import {Request, Response} from "express";
import {getAuthUserOrFail} from "@middlewares/require.auth";
import {skinOwnershipService} from "@modules/skin-ownership/skin-ownership.service";
import {SkinOwnershipSourceValues} from "@modules/skin-ownership/skin-ownership.source";

/**
 * ==========
 * `GET /api/users/:userId/skin-ownerships`
 * ==========
 */
export async function getUserSkins(
    req: Request,
    res: Response
): Promise<void> {
    const user = getAuthUserOrFail(req);

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
    const user = getAuthUserOrFail(req);

    let {userId, skinId} = req.body ?? {};
    userId = Number(userId);
    skinId = Number(skinId);

    await skinOwnershipService.grantSkin(user, {userId, skinId, source: SkinOwnershipSourceValues.ADMIN});

    res.json({success: true});
}