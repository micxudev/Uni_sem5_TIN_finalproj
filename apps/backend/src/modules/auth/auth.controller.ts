import {Request, Response} from "express";
import {ApiSuccess, AuthInputSchema, ChangePasswordInputSchema, User} from "@shared";
import {authService, requireAuthUser, requireNonAuthUser, sessionService} from "@modules/auth";
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
    requireNonAuthUser(req);

    const parsedBody = parseBodyOrThrow(AuthInputSchema, req);

    const user = await authService.registerUser(parsedBody);

    const apiSuccess: ApiSuccess<User> = {
        success: true,
        data: user
    };
    res.status(201).json(apiSuccess);
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
    requireNonAuthUser(req);

    const parsedBody = parseBodyOrThrow(AuthInputSchema, req);

    const user = await authService.loginUser(parsedBody);

    sessionService.create(req, user);

    const apiSuccess: ApiSuccess<User> = {
        success: true,
        data: user
    };
    res.json(apiSuccess);
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
    requireAuthUser(req);

    await sessionService.destroy(req);

    const apiSuccess: ApiSuccess<void> = {
        success: true,
        data: undefined
    };
    res.json(apiSuccess);
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

    const apiSuccess: ApiSuccess<void> = {
        success: true,
        data: undefined
    };
    res.json(apiSuccess);
}

/**
 * ==========
 * `GET /api/auth/me`
 * ==========
 */
export async function getCurrentUser(
    req: Request,
    res: Response
): Promise<void> {
    const user = requireAuthUser(req);

    const apiSuccess: ApiSuccess<User> = {
        success: true,
        data: user
    };
    res.json(apiSuccess);
}