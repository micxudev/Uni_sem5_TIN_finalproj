import {apiFetch} from "./http";
import type {ApiResponse, AuthInput, ChangePasswordInput, User} from "@shared";

export function register(data: AuthInput): Promise<ApiResponse<User>> {
    return apiFetch<User>("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
}

export function login(data: AuthInput): Promise<ApiResponse<User>> {
    return apiFetch<User>("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
}

export function logout(): Promise<ApiResponse<void>> {
    return apiFetch<void>("/api/auth/logout", {
        method: "POST",
    });
}

export function changePassword(data: ChangePasswordInput): Promise<ApiResponse<void>> {
    return apiFetch<void>("/api/auth/change-password", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
}

export function getCurrentUser(): Promise<ApiResponse<User>> {
    return apiFetch<User>("/api/auth/me");
}