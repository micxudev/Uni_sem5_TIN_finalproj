import {User} from "@modules/users/user.domain";

declare module "express-session" {
    interface SessionData {
        user?: User
    }
}