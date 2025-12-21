export interface PaginationInput {
    page?: unknown;
    size?: unknown;
}

export interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface PaginatedResult<T> {
    meta: PaginationMeta;
    data: T[];
}

const DEFAULTS = {
    PAGE: 1,
    LIMIT: 20,
    MAX_LIMIT: 100,
    MAX_OFFSET: 2_000_000_000,
} as const;

class PaginationImpl {
    readonly page: number;
    readonly limit: number;
    readonly offset: number;

    constructor(input: PaginationInput) {
        const page = PaginationImpl.parsePositiveInt(input.page) ?? DEFAULTS.PAGE;
        const rawLimit = PaginationImpl.parsePositiveInt(input.size) ?? DEFAULTS.LIMIT;
        const clampedLimit = Math.min(rawLimit, DEFAULTS.MAX_LIMIT);
        const offset = (page - 1) * clampedLimit;
        const clampedOffset = Math.min(offset, DEFAULTS.MAX_OFFSET);

        this.page = page;
        this.limit = clampedLimit;
        this.offset = clampedOffset;
    }

    private static parsePositiveInt(value: unknown): number | undefined {
        if (value === undefined) return undefined;
        const n = Number(value);
        if (!Number.isInteger(n) || n <= 0) return undefined;
        return n;
    }

    meta(total: number): PaginationMeta {
        return {
            total,
            per_page: this.limit,
            current_page: this.page,
            last_page: Math.ceil(total / this.limit),
        };
    }
}

export const Pagination = {
    from: (input: PaginationInput) => new PaginationImpl(input),
} as const;