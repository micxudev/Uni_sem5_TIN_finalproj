import {z} from "zod";
import {IdSchema} from "../index";

export const UserIdParamSchema = z.object({
    userId: IdSchema,
});

export type UserIdParam = z.infer<typeof UserIdParamSchema>;