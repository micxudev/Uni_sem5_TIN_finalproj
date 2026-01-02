import {useState} from "react";
import {type Skin, UserRoleValues} from "@shared";

import {fetchSkins} from "../api/api.skins.ts";

import {PaginatedTable} from "../components/PaginatedTable/PaginatedTable";
import type {Column} from "../components/PaginatedTable/Table/types";
import {Modal} from "../components/Modal/Modal";
import {SkinModal} from "../components/SkinModal/SkinModal";
import {useI18n} from "../i18n/I18nContext.tsx";
import {useUser} from "../AuthContext/AuthContext.tsx";

export function SkinsPage() {
    const t = useI18n();
    const user = useUser();
    const isAdmin = user?.role === UserRoleValues.ADMIN;

    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const columns: Column<Skin>[] = [
        {key: "id", header: t.skins.id, render: s => s.id},
        {key: "name", header: t.skins.name, render: s => s.name},
        {key: "rarity", header: t.skins.rarity, render: s => s.rarity},
        {key: "createdAt", header: t.skins.createdAt, render: s => new Date(s.createdAt).toLocaleString()},
    ];

    return (
        <>
            <PaginatedTable<Skin>
                fetcher={fetchSkins}
                perPage={8}
                columns={columns}
                onRowSelect={setSelectedSkin}
                header={(result) => (
                    <h2>{result.meta.total} {t.skins.title}</h2>
                )}
                labels={{
                    error: t.errors.serverNotResponded,
                    prev: t.pagination.prev,
                    next: t.pagination.next,
                    page: t.pagination.page,
                }}
            />

            {selectedSkin && (
                <Modal onClose={() => setSelectedSkin(null)}>
                    <SkinModal
                        skin={selectedSkin}
                        canEdit={isAdmin}
                        canDelete={isAdmin}
                        onEdit={() => console.log("edit", selectedSkin.id)}
                        onDelete={() => console.log("delete", selectedSkin.id)}
                        labels={{
                            title: selectedSkin.name,
                            id: t.skins.id,
                            rarity: t.skins.rarity,
                            createdAt: t.skins.createdAt,
                            edit: t.common.edit,
                            delete: t.common.delete,
                        }}
                    />
                </Modal>
            )}
        </>
    );
}