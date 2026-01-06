import {CustomError} from "@errors";
import {ErrorCodeValues} from "@shared";

export class LootboxCooldownError extends CustomError {
    readonly statusCode = 400;
    readonly errorCode = ErrorCodeValues.COOLDOWN_ERROR;

    constructor(public remainingMs: number) {
        super(remainingMs.toString());
    }
}