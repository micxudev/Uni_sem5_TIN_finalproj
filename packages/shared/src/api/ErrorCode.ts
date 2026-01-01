import {z} from "zod";

export const ErrorCodeSchema = z.enum([
    "BAD_REQUEST",
    "UNAUTHENTICATED",
    "UNAUTHORIZED",
    "NOT_FOUND",
    "CONFLICT",
    "VALIDATION_ERROR",
    "INTERNAL_ERROR",
]);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ErrorCodeValues = ErrorCodeSchema.enum;