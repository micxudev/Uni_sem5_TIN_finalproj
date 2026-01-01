import type {ApiResponse, PaginatedResult, Skin} from "@shared";
import {apiFetch} from "./http.ts";

export async function fetchSkins(page = 1, size = 5): Promise<ApiResponse<PaginatedResult<Skin>>> {
    return apiFetch<PaginatedResult<Skin>>(`/api/skins?page=${page}&size=${size}`);
}