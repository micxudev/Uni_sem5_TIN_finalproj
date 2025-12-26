import {z} from "zod";
import {IdSchema} from "../utils/id.schema";

export const GrantSkinSchema = z.object({
    userId: IdSchema,
    skinId: IdSchema,
});

export type GrantSkin = z.infer<typeof GrantSkinSchema>;