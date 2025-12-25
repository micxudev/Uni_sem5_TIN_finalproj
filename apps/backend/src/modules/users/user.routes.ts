import {Router} from "express";
import {getPaginated, getById} from "@modules/users/user.controller";

export const usersRouter = Router();

usersRouter.get("/", getPaginated);
usersRouter.get("/:id", getById);