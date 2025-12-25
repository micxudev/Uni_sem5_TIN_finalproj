import {Response} from "express";

/**
 * Base class for custom errors.
 */
export abstract class CustomError extends Error {
    abstract readonly statusCode: number;

    constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }

    sendJson(res: Response): void {
        res.status(this.statusCode).json({error: this.message});
    }
}