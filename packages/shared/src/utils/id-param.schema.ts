import {z} from "zod";
import {IdSchema} from "./id.schema";

export const IdParamSchema = z.object({
    id: IdSchema,
});

export type IdParam = z.infer<typeof IdParamSchema>;