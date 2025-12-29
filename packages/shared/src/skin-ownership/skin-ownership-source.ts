import {z} from "zod";

export const SkinOwnershipSourceSchema = z.enum([
    "ADMIN",
    "LOOTBOX",
]);

export type SkinOwnershipSource = z.infer<typeof SkinOwnershipSourceSchema>;

export const SkinOwnershipSourceValues = SkinOwnershipSourceSchema.enum;