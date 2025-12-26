import {z} from "zod";
import {SkinRaritySchema} from "./skin-rarity.schema";

export const SkinInputSchema = z.object({
    name: z.string().trim().min(5).max(50),
    rarity: SkinRaritySchema,
});

export type SkinInput = z.infer<typeof SkinInputSchema>;