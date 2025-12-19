import express, {Request, Response} from "express";
import {registerUser, loginUser} from "./auth.service";
import {createSession, destroySession} from "./auth.session";

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        return res.status(400).json({error: "strings 'username' and 'password' are required"});

    if (username.length < 3)
        return res.status(400).json({error: "username must be at least 3 chars.",});

    try {
        const user = await registerUser(username, password);
        res.status(201).json({id: user.id});
    } catch (err) {
        res.status(400).json({error: "username already taken"});
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string")
        return res.status(400).json({error: "strings 'username' and 'password' are required"});

    const user = await loginUser(username, password);

    if (!user)
        return res.status(401).json({error: "Invalid credentials"});

    createSession(req, user);
    res.json({success: true});
});

authRouter.post("/logout", async (req: Request, res: Response) => {
    await destroySession(req);
    res.json({success: true});
});