import {apiFetch} from "./http.ts";
import type {ApiResponse, SkinOwnership} from "@shared";

export function openLootbox(): Promise<ApiResponse<SkinOwnership>> {
    return apiFetch<SkinOwnership>("/api/lootboxes/open");
}