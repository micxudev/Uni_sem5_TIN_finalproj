import {apiFetch} from "./http.ts";
import type {ApiResponse, PaginatedResult, Skin, SkinInput} from "@shared";

export function fetchSkins(page = 1, size = 5): Promise<ApiResponse<PaginatedResult<Skin>>> {
    return apiFetch<PaginatedResult<Skin>>(`/api/skins?page=${page}&size=${size}`);
}

export function fetchSkin(id: number): Promise<ApiResponse<Skin>> {
    return apiFetch<Skin>(`/api/skins/${id}`);
}

export function createSkin(input: SkinInput): Promise<ApiResponse<Skin>> {
    return apiFetch<Skin>("/api/skins", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
    });
}

export function updateSkin(id: number, input: SkinInput): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/skins/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input),
    });
}

export function deleteSkin(id: number): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/skins/${id}`, {
        method: "DELETE",
    });
}