import {z} from "zod";

export const UserRoleSchema = z.enum([
    "PLAYER",
    "ADMIN",
]);

export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserRoleValues = UserRoleSchema.enum;