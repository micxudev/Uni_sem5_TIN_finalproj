import {Router} from "express";
import {getUserSkins, grantSkinToUser} from "@modules/skin-ownership/skin-ownership.controller";

export const skinOwnershipsRouter = Router();

skinOwnershipsRouter.get("/users/:userId/skin-ownerships", getUserSkins);
skinOwnershipsRouter.post("/skin-ownerships", grantSkinToUser);