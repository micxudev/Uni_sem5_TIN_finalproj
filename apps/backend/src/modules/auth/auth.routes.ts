import {Router, Request, Response} from "express";
import {authService} from "@modules/auth/auth.service";
import {sessionService} from "@modules/auth/auth.session";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        return res.status(400).json({error: "strings 'username' and 'password' are required"});

    if (username.length < 3)
        return res.status(400).json({error: "username must be at least 3 chars.",});

    try {
        const user = await authService.registerUser(username, password);
        res.status(201).json({id: user.id});
    } catch (err) {
        res.status(400).json({error: "username already taken"});
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        return res.status(400).json({error: "strings 'username' and 'password' are required"});

    const user = await authService.loginUser(username, password);

    if (!user)
        return res.status(401).json({error: "Invalid credentials"});

    sessionService.create(req, user);
    res.json({success: true});
});

authRouter.post("/logout", async (req: Request, res: Response) => {
    await sessionService.destroy(req);
    res.json({success: true});
});

authRouter.post("/change-password", async (req: Request, res: Response) => {
    const user = req.session.user;
    if (!user)
        return res.status(401).json({error: "Not authenticated"});

    const userId = user.id;

    const {currentPassword, newPassword} = req.body ?? {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string")
        return res.status(400).json({error: "strings 'currentPassword' and 'newPassword' are required"});

    try {
        await authService.changePassword(
            userId,
            currentPassword,
            newPassword
        );

        res.json({success: true});
    } catch (err) {
        res.status(400).json({error: "Invalid current password"});
    }
});