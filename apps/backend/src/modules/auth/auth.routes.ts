import {Router, Request, Response} from "express";
import {authService} from "@modules/auth/auth.service";
import {sessionService} from "@modules/auth/auth.session";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).json({error: "strings 'username' and 'password' are required"});
        return;
    }

    if (username.length < 3) {
        res.status(400).json({error: "username must be at least 3 chars.",});
        return;
    }

    try {
        const user = await authService.registerUser(username, password);
        res.status(201).json({id: user.id});
    } catch (err) {
        res.status(409).json({error: "username already taken"});
    }
});

authRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).json({error: "strings 'username' and 'password' are required"});
        return;
    }

    const user = await authService.loginUser(username, password);

    if (!user) {
        res.status(401).json({error: "Invalid credentials"});
        return;
    }

    sessionService.create(req, user);
    res.json({success: true});
});

authRouter.post("/logout", async (req: Request, res: Response) => {
    await sessionService.destroy(req);
    res.json({success: true});
});

authRouter.post("/change-password", async (req: Request, res: Response): Promise<void> => {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({error: "Not authenticated"});
        return;
    }

    const {currentPassword, newPassword} = req.body ?? {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
        res.status(400).json({error: "strings 'currentPassword' and 'newPassword' are required"});
        return;
    }

    try {
        await authService.changePassword(
            user.id,
            currentPassword,
            newPassword
        );

        res.json({success: true});
    } catch (err) {
        res.status(400).json({error: "Invalid current password"});
    }
});