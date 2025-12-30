import type {PaginatedResult, Skin} from "@shared";

export async function fetchSkins(page = 1, size = 5): Promise<PaginatedResult<Skin>> {
    const res = await fetch(`/api/skins?page=${page}&size=${size}`);
    if (!res.ok) throw new Error(`Error fetching skins: ${res.status}`);
    return res.json();
}