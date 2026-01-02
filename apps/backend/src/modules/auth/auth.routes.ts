import {Router} from "express";
import {changePassword, getCurrentUser, login, logout, register} from "@modules/auth/auth.controller";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/change-password", changePassword);
authRouter.get("/me", getCurrentUser);