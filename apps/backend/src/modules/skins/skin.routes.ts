import {Router} from "express";
import {getPaginated, getById, create, update, deleteById} from "@modules/skins/skin.controller"

export const skinsRouter = Router();

skinsRouter.get("/", getPaginated);
skinsRouter.get("/:id", getById);
skinsRouter.post("/", create);
skinsRouter.put("/:id", update);
skinsRouter.delete("/:id", deleteById);