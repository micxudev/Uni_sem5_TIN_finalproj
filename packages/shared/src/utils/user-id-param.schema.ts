import {z} from "zod";
import {IdSchema} from "./id.schema";

export const UserIdParamSchema = z.object({
    userId: IdSchema,
});

export type UserIdParam = z.infer<typeof UserIdParamSchema>;