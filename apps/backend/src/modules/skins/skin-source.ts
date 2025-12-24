import {z} from "zod";

export const SkinSourceSchema = z.enum([
    "ADMIN",
    "LOOTBOX",
]);

export type SkinSource = z.infer<typeof SkinSourceSchema>;