import {ErrorCode} from "./ErrorCode";

export type ApiSuccess<T> = {
    success: true;
    data: T;
};

export type ApiError<E = unknown> = {
    success: false;
    error: {
        code: ErrorCode;
        message: string;
        details?: E;
    };
};

export type ApiResponse<T, E = unknown> = ApiSuccess<T> | ApiError<E>;