import {User} from "@modules/users";

declare module "express-session" {
    interface SessionData {
        user?: User
    }
}