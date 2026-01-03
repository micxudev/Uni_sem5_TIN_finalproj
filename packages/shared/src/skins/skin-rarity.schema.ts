import {z} from "zod";

export const SkinRaritySchema = z.enum([
    "COMMON",
    "RARE",
    "LEGENDARY",
]);

export type SkinRarity = z.infer<typeof SkinRaritySchema>;

export const SkinRarityValues = SkinRaritySchema.enum;