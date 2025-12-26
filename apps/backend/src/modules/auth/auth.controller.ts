import {Request, Response} from "express";
import {authService, requireAuthUser, sessionService} from "@modules/auth";
import {BadRequestError} from "@errors";

/**
 * ==========
 * `POST /api/auth/register`
 * ==========
 */
export async function register(
    req: Request,
    res: Response
): Promise<void> {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        throw new BadRequestError("strings 'username' and 'password' are required");

    if (username.length < 3)
        throw new BadRequestError("username must be at least 3 chars.");

    const user = await authService.registerUser(username, password);

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
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        throw new BadRequestError("strings 'username' and 'password' are required");

    const user = await authService.loginUser(username, password);

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

    const {currentPassword, newPassword} = req.body ?? {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string")
        throw new BadRequestError("strings 'currentPassword' and 'newPassword' are required");

    await authService.changePassword(user.id, currentPassword, newPassword);

    res.json({success: true});
}