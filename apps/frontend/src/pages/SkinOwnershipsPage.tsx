import {useState} from "react";
import {toast} from "react-toastify";
import {type PaginatedResult, type SkinOwnership, UserRoleValues} from "@shared";
import {ErrorFlash} from "../components/ErrorFlash.tsx";

import {fetchSkinOwnerships} from "../api/api.skin-ownership.ts";

import {PaginatedTable} from "../components/PaginatedTable/PaginatedTable";
import type {Column} from "../lib/types.ts";

import {PreviewSkinModal} from "../components/Modals/PreviewSkinModal.tsx";
import {GrantSkinModal} from "../components/Modals/GrantSkinModal.tsx";

import {useI18n} from "../contexts/I18nContext.tsx";
import {useUser} from "../contexts/AuthContext.tsx";

export function SkinOwnershipsPage() {
    const [selectedSkinOwnership, setSelectedSkinOwnership] = useState<SkinOwnership | null>(null);
    const [isGrantSkinModalOpen, setGrantSkinModalOpen] = useState(false);

    const t = useI18n();
    const user = useUser();
    const isAdmin = user?.role === UserRoleValues.ADMIN;

    const [tableVersion, setTableVersion] = useState(0);
    const columns: Column<SkinOwnership>[] = [
        {key: "id", header: t.skin_ownership.ownershipId, render: s => s.ownershipId},
        {key: "source", header: t.skin_ownership.source, render: s => s.source},
        {key: "obtainedAt", header: t.skin_ownership.obtainedAt, render: s => new Date(s.obtainedAt).toLocaleString()},
        {key: "skin", header: t.skin_ownership.skin, render: s => s.skin.name},
    ];

    if (!user) {
        return <ErrorFlash title={t.errors.unauthenticated} error={t.errors.authRequired}/>;
    }

    function renderPaginatedTableHeader(result: PaginatedResult<SkinOwnership>) {
        return (
            <div className="paginated-table__header">
                <h2>{result.meta.total} {t.skin_ownership.title}</h2>
                {isAdmin && (
                    <button onClick={() => setGrantSkinModalOpen(true)}>
                        {t.skin_ownership.grant}
                    </button>
                )}
            </div>
        );
    }

    function renderPreviewSkinModal() {
        if (!selectedSkinOwnership) return null;
        return (
            <PreviewSkinModal
                skin={selectedSkinOwnership.skin}
                canUpdate={false}
                canDelete={false}
                onUpdateClick={() => {
                }}
                onDeleteClick={() => {
                }}
                onClose={() => setSelectedSkinOwnership(null)}
                labels={{
                    title: selectedSkinOwnership.skin.name,
                    id: t.skins.id,
                    rarity: t.skins.rarity,
                    createdAt: t.skins.createdAt,
                    update: t.common.update,
                    delete: t.common.delete,
                }}
            />
        );
    }

    function renderGrantSkinModal() {
        if (!isGrantSkinModalOpen) return null;
        return (
            <GrantSkinModal
                onClose={() => setGrantSkinModalOpen(false)}
                onGrant={() => {
                    setTableVersion(v => v + 1);
                    toast.success(t.skin_ownership.grantSuccess);
                }}
                labels={{
                    title: t.skin_ownership.grant,
                    userId: t.skin_ownership.userId,
                    skinId: t.skin_ownership.skinId,
                    submit: t.skin_ownership.grant,
                }}
            />
        );
    }

    return (
        <>
            <PaginatedTable<SkinOwnership>
                fetcher={(page, perPage) => fetchSkinOwnerships(user.id, page, perPage)}
                perPage={8}
                columns={columns}
                onRowClick={setSelectedSkinOwnership}
                refreshKey={tableVersion}
                header={renderPaginatedTableHeader}
                labels={{
                    error: t.errors.serverNotResponded,
                    noData: t.skin_ownership.noData,
                    prev: t.pagination.prev,
                    next: t.pagination.next,
                    page: t.pagination.page,
                }}
            />
            {renderPreviewSkinModal()}
            {renderGrantSkinModal()}
        </>
    );
}