import {z} from "zod";

const passwordSchema = z.string().trim().min(8);

export const AuthInputSchema = z.object({
    username: z.string().trim().min(5).max(32).regex(/^[a-z0-9_]+$/),
    password: passwordSchema,
});

export type AuthInput = z.infer<typeof AuthInputSchema>;


export const ChangePasswordInputSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordInputSchema>;