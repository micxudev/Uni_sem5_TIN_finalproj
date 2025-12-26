import {Request, Response} from "express";
import {AuthInputSchema, ChangePasswordInputSchema} from "@shared";
import {authService, requireAuthUser, sessionService} from "@modules/auth";
import {parseBodyOrThrow} from "@utils/parse-or-throw";

/**
 * ==========
 * `POST /api/auth/register`
 * ==========
 */
export async function register(
    req: Request,
    res: Response
): Promise<void> {
    const parsedBody = parseBodyOrThrow(AuthInputSchema, req);

    const user = await authService.registerUser(parsedBody);

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
    const parsedBody = parseBodyOrThrow(AuthInputSchema, req);

    const user = await authService.loginUser(parsedBody);

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

    const parsedBody = parseBodyOrThrow(ChangePasswordInputSchema, req);

    await authService.changePassword(user.id, parsedBody);

    res.json({success: true});
}