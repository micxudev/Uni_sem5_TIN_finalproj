import {Router} from "express";
import {open} from "@modules/lootboxes/lootboxes.controller";

export const lootboxesRouter = Router();

lootboxesRouter.get("/open", open);