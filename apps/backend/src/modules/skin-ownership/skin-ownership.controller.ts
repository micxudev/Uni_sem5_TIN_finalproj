import {Request, Response} from "express";
import {GrantSkinSchema, UserIdParamSchema} from "@shared";
import {requireAuthUser} from "@modules/auth";
import {skinOwnershipService, SkinOwnershipSourceValues} from "@modules/skin-ownership";
import {parseBodyOrThrow, parseParamsOrThrow} from "@utils/parse-or-throw";

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

    const {userId} = parseParamsOrThrow(UserIdParamSchema, req);

    const result = await skinOwnershipService.getUserSkins(user, userId);

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

    const {userId, skinId} = parseBodyOrThrow(GrantSkinSchema, req);

    await skinOwnershipService.grantSkin(user, {userId, skinId, source: SkinOwnershipSourceValues.ADMIN});

    res.json({success: true});
}