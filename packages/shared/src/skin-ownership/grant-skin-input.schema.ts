import {z} from "zod";
import {IdSchema} from "../utils/id.schema";

export const GrantSkinInputSchema = z.object({
    userId: IdSchema,
    skinId: IdSchema,
});

export type GrantSkinInput = z.infer<typeof GrantSkinInputSchema>;