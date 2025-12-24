import {Response} from "express";

/**
 * Base class for custom HTTP errors.
 */
export abstract class HttpError extends Error {
    abstract readonly statusCode: number;

    constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }

    sendJson(res: Response): void {
        res.status(this.statusCode).json({error: this.message});
    }
}

/**
 * Occurs when a request is malformed or missing required parameters
 */
export class BadRequestError extends HttpError {
    readonly statusCode = 400;
}

/**
 * Verifies the identity of a user
 */
export class AuthenticationError extends HttpError {
    readonly statusCode = 401;
}

/**
 * Determines whether an authenticated user can access a specific resource
 */
export class AuthorizationError extends HttpError {
    readonly statusCode = 403;
}

/**
 * Occurs when a requested resource cannot be found
 */
export class NotFoundError extends HttpError {
    readonly statusCode = 404;
}

/**
 * Occurs when a resource cannot be created due to a conflict with existing data
 */
export class ConflictError extends HttpError {
    readonly statusCode = 409;
}