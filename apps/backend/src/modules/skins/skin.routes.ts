import {Router} from "express";
import {create, deleteById, getById, getPaginated, update} from "@modules/skins/skin.controller";

export const skinsRouter = Router();

skinsRouter.get("/", getPaginated);
skinsRouter.get("/:id", getById);
skinsRouter.post("/", create);
skinsRouter.put("/:id", update);
skinsRouter.delete("/:id", deleteById);