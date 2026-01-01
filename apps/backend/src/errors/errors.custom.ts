import {Response} from "express";
import {ApiError, ErrorCode} from "@shared";

/**
 * Base class for custom errors.
 */
export abstract class CustomError<T = unknown> extends Error {
    abstract readonly statusCode: number;
    abstract readonly errorCode: ErrorCode;
    readonly payload?: T;

    constructor(message?: string, payload?: T) {
        super(message);
        this.name = new.target.name;
        this.payload = payload;
    }

    sendJson(res: Response): void {
        const apiError: ApiError = {
            success: false,
            error: {
                code: this.errorCode,
                message: this.message,
                details: this.payload,
            }
        };
        res.status(this.statusCode).json(apiError);
    }
}