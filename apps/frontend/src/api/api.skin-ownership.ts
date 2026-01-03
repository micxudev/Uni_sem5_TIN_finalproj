import {apiFetch} from "./http.ts";
import type {ApiResponse, GrantSkinInput, PaginatedResult, SkinOwnership} from "@shared";

export function fetchSkinOwnerships(userId: number, page = 1, size = 5): Promise<ApiResponse<PaginatedResult<SkinOwnership>>> {
    return apiFetch<PaginatedResult<SkinOwnership>>(`/api/users/${userId}/skin-ownerships?page=${page}&size=${size}`);
}

export function grantSkin(input: GrantSkinInput): Promise<ApiResponse<void>> {
    return apiFetch<void>("/api/skin-ownerships", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
    });
}