import {Router} from "express";

import {authRouter} from "@modules/auth";
import {skinsRouter} from "@modules/skins";
import {usersRouter} from "@modules/users";
import {lootboxesRouter} from "@modules/lootboxes";
import {skinOwnershipsRouter} from "@modules/skin-ownership";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/skins", skinsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/lootboxes", lootboxesRouter);
apiRouter.use("/", skinOwnershipsRouter);