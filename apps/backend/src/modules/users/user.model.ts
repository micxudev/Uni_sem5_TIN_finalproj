import {UserRole} from "@modules/users/user-role";

export interface User {
    id: number;
    username: string;
    password_hash: string;
    role: UserRole;
}