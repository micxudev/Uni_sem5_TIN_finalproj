import {z} from "zod";
import {IdSchema} from "../index";

export const IdParamSchema = z.object({
    id: IdSchema,
});

export type IdParam = z.infer<typeof IdParamSchema>;