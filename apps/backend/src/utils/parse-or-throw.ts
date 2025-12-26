import {Request} from "express";
import {z, ZodType} from "zod";
import {BadRequestError} from "@errors";

type ParseOrThrowOptions = {
    message?: string;
};

export function parseOrThrow<T extends ZodType>(
    schema: T,
    data: unknown,
    options?: ParseOrThrowOptions
): z.infer<T> {
    const result = schema.safeParse(data);

    if (!result.success)
        throw new BadRequestError(options?.message ?? "Invalid data", z.flattenError(result.error));

    return result.data;
}

export const parseBodyOrThrow = <T extends ZodType>(
    schema: T,
    req: Request
) => parseOrThrow(schema, req.body);

export const parseParamsOrThrow = <T extends ZodType>(
    schema: T,
    req: Request
) => parseOrThrow(schema, req.params);

export const parseQueryOrThrow = <T extends ZodType>(
    schema: T,
    req: Request
) => parseOrThrow(schema, req.query);