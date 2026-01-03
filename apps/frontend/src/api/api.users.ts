import {apiFetch} from "./http.ts";
import type {ApiResponse, PaginatedResult, User} from "@shared";

export function fetchUsers(page = 1, size = 5): Promise<ApiResponse<PaginatedResult<User>>> {
    return apiFetch<PaginatedResult<User>>(`/api/users?page=${page}&size=${size}`);
}

export function fetchUser(id: number): Promise<ApiResponse<User>> {
    return apiFetch<User>(`/api/users/${id}`);
}