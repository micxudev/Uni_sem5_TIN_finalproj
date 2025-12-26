import {z} from "zod";

export const IdSchema = z.coerce.number<number>().int().positive();

export type Id = z.infer<typeof IdSchema>;