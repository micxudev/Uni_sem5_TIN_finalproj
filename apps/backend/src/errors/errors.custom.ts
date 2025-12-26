import {Response} from "express";

/**
 * Base class for custom errors.
 */
export abstract class CustomError<T = unknown> extends Error {
    abstract readonly statusCode: number;
    readonly payload?: T;

    constructor(message?: string, payload?: T) {
        super(message);
        this.name = new.target.name;
        this.payload = payload;
    }

    sendJson(res: Response): void {
        res.status(this.statusCode).json({error: this.message, details: this.payload});
    }
}