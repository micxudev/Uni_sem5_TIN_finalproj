import "apps/backend/src/types/express-session";
import {UserRole} from "../modules/users/user-role";

declare module "express-session" {
    interface SessionData {
        userId?: number;
        role?: UserRole;
    }
}