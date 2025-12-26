import {CustomError} from "@errors";

export class LootboxCooldownError extends CustomError {
    readonly statusCode = 400;

    constructor(public remainingMs: number) {
        super(remainingMs.toString());
    }
}