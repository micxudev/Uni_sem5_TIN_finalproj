import {UserRole} from "./user-role";

export interface User {
    id: number;
    username: string;
    password_hash: string;
    role: UserRole;
}