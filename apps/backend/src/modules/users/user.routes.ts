import {Router} from "express";
import {getById, getPaginated} from "@modules/users/user.controller";

export const usersRouter = Router();

usersRouter.get("/", getPaginated);
usersRouter.get("/:id", getById);