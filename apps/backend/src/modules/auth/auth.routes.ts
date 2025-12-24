import {Router, Request, Response} from "express";
import {authService} from "@modules/auth/auth.service";
import {sessionService} from "@modules/auth/auth.session";
import {getAuthUserOrFail} from "@middlewares/require.auth";
import {BadRequestError} from "@errors/errors.http";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        throw new BadRequestError("strings 'username' and 'password' are required");

    if (username.length < 3)
        throw new BadRequestError("username must be at least 3 chars.");

    const user = await authService.registerUser(username, password);
    res.status(201).json({id: user.id});
});

authRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        throw new BadRequestError("strings 'username' and 'password' are required");

    const user = await authService.loginUser(username, password);

    sessionService.create(req, user);
    res.json({success: true});
});

authRouter.post("/logout", async (req: Request, res: Response): Promise<void> => {
    await sessionService.destroy(req);
    res.json({success: true});
});

authRouter.post("/change-password", async (req: Request, res: Response): Promise<void> => {
    const user = getAuthUserOrFail(req);

    const {currentPassword, newPassword} = req.body ?? {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string")
        throw new BadRequestError("strings 'currentPassword' and 'newPassword' are required");

    await authService.changePassword(user.id, currentPassword, newPassword);
    res.json({success: true});
});