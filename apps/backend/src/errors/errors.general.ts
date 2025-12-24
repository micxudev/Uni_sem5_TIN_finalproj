/**
 * Is thrown when an unexpected error occurs and no specific action can be taken.
 */
export class UnexpectedError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }
}