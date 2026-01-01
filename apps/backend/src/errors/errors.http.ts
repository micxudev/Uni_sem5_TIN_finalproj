import {CustomError} from "@errors";
import {ErrorCodeValues} from "@shared";

/**
 * Base class for custom HTTP errors.
 */
export abstract class HttpError extends CustomError {
}

/**
 * Occurs when a request is malformed or missing required parameters
 */
export class BadRequestError extends HttpError {
    readonly statusCode = 400;
    readonly errorCode = ErrorCodeValues.BAD_REQUEST;
}

/**
 * Verifies the identity of a user
 */
export class AuthenticationError extends HttpError {
    readonly statusCode = 401;
    readonly errorCode = ErrorCodeValues.UNAUTHENTICATED;
}

/**
 * Determines whether an authenticated user can access a specific resource
 */
export class AuthorizationError extends HttpError {
    readonly statusCode = 403;
    readonly errorCode = ErrorCodeValues.UNAUTHORIZED;
}

/**
 * Occurs when a requested resource cannot be found
 */
export class NotFoundError extends HttpError {
    readonly statusCode = 404;
    readonly errorCode = ErrorCodeValues.NOT_FOUND;
}

/**
 * Occurs when a resource cannot be created due to a conflict with existing data
 */
export class ConflictError extends HttpError {
    readonly statusCode = 409;
    readonly errorCode = ErrorCodeValues.CONFLICT;
}