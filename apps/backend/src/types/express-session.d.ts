import {User} from "@shared";

declare module "express-session" {
    interface SessionData {
        user?: User
    }
}