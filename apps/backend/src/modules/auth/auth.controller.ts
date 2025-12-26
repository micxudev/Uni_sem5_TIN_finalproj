import {Request, Response} from "express";
import {z} from "zod";
import {authService, requireAuthUser, sessionService} from "@modules/auth";
import {BadRequestError} from "@errors";
import {AuthInputSchema, ChangePasswordInputSchema} from "@shared";

/**
 * ==========
 * `POST /api/auth/register`
 * ==========
 */
export async function register(
    req: Request,
    res: Response
): Promise<void> {
    const result = AuthInputSchema.safeParse(req.body);
    if (!result.success)
        throw new BadRequestError("Invalid Input", z.flattenError(result.error));

    const user = await authService.registerUser(result.data);

    res.status(201).json({id: user.id});
}

/**
 * ==========
 * `POST /api/auth/login`
 * ==========
 */
export async function login(
    req: Request,
    res: Response
): Promise<void> {
    const result = AuthInputSchema.safeParse(req.body);
    if (!result.success)
        throw new BadRequestError("Invalid Input", z.flattenError(result.error));

    const user = await authService.loginUser(result.data);

    sessionService.create(req, user);

    res.json({success: true});
}

/**
 * ==========
 * `POST /api/auth/logout`
 * ==========
 */
export async function logout(
    req: Request,
    res: Response
): Promise<void> {
    await sessionService.destroy(req);

    res.json({success: true});
}

/**
 * ==========
 * `POST /api/auth/change-password`
 * ==========
 */
export async function changePassword(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    const result = ChangePasswordInputSchema.safeParse(req.body);
    if (!result.success)
        throw new BadRequestError("Invalid Input", z.flattenError(result.error));

    await authService.changePassword(user.id, result.data);

    res.json({success: true});
}