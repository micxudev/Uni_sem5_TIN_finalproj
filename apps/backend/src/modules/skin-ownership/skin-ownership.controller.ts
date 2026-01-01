import {Request, Response} from "express";
import {
    ApiSuccess,
    GrantSkinInputSchema,
    PaginatedResult,
    PaginationInput,
    SkinOwnership,
    UserIdParamSchema
} from "@shared";
import {requireAuthUser} from "@modules/auth";
import {skinOwnershipService} from "@modules/skin-ownership";
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
    const paginationInput: PaginationInput = {
        page: req.query.page,
        size: req.query.size
    };

    const result = await skinOwnershipService.getPaginatedUserSkins(
        user, userId, paginationInput
    );

    const apiSuccess: ApiSuccess<PaginatedResult<SkinOwnership>> = {
        success: true,
        data: result
    };
    res.json(apiSuccess);
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

    const parsedBody = parseBodyOrThrow(GrantSkinInputSchema, req);

    await skinOwnershipService.grantSkin(user, parsedBody);

    const apiSuccess: ApiSuccess<void> = {
        success: true,
        data: undefined
    };
    res.json(apiSuccess);
}