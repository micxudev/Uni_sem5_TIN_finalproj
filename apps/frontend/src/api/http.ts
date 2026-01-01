import {type ApiResponse, ErrorCodeValues} from "@shared";

export async function apiFetch<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(input, init);
        return await res.json();
    } catch {
        return {
            success: false,
            error: {
                code: ErrorCodeValues.INTERNAL_ERROR,
                message: "Server is unreachable / Invalid server response",
            }
        };
    }
}