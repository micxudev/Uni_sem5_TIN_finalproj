import {useState} from "react";
import {toast} from "react-toastify";
import {type PaginatedResult, type Skin, UserRoleValues} from "@shared";

import {deleteSkin, fetchSkins} from "../api/api.skins.ts";

import {PaginatedTable} from "../components/PaginatedTable/PaginatedTable";
import type {Column} from "../lib/types.ts";

import {PreviewSkinModal} from "../components/Modals/PreviewSkinModal.tsx";
import {CreateSkinModal} from "../components/Modals/CreateSkinModal.tsx";
import {UpdateSkinModal} from "../components/Modals/UpdateSkinModal.tsx";

import {useI18n} from "../contexts/I18nContext.tsx";
import {useUser} from "../contexts/AuthContext.tsx";
import {useConfirm} from "../contexts/ConfirmContext.tsx";

export function SkinsPage() {
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [isCreateSkinModalModalOpen, setCreateSkinModalModalOpen] = useState(false);
    const [isUpdateSkinModalModalOpen, setUpdateSkinModalModalOpen] = useState(false);

    const t = useI18n();
    const user = useUser();
    const confirm = useConfirm();
    const isAdmin = user?.role === UserRoleValues.ADMIN;
    const isUserSkinOwner = user?.id === selectedSkin?.createdBy;

    const [tableVersion, setTableVersion] = useState(0);
    const columns: Column<Skin>[] = [
        {key: "id", header: t.skins.id, render: s => s.id},
        {key: "name", header: t.skins.name, render: s => s.name},
        {key: "rarity", header: t.skins.rarity, render: s => s.rarity},
        {key: "createdAt", header: t.skins.createdAt, render: s => new Date(s.createdAt).toLocaleString()},
    ];

    function renderPaginatedTableHeader(result: PaginatedResult<Skin>) {
        return (
            <div className="paginated-table__header">
                <h2>{result.meta.total} {t.skins.title}</h2>
                {isAdmin && (
                    <button onClick={() => setCreateSkinModalModalOpen(true)}>
                        {t.skins.create}
                    </button>
                )}
            </div>
        );
    }

    function renderPreviewSkinModal() {
        if (!selectedSkin) return null;
        const onClose = () => setSelectedSkin(null);
        return (
            <PreviewSkinModal
                skin={selectedSkin}
                canUpdate={isAdmin && isUserSkinOwner}
                canDelete={isAdmin && isUserSkinOwner}
                onUpdateClick={() => setUpdateSkinModalModalOpen(true)}
                onDeleteClick={async () => {
                    const confirmed = await confirm({
                        title: t.skins.delete,
                        text: t.skins.deleteConfirm,
                        confirm: t.skins.delete,
                        cancel: t.common.cancel,
                    });
                    if (!confirmed) return;

                    onClose();

                    const res = await deleteSkin(selectedSkin.id);
                    if (res.success) {
                        setTableVersion(v => v + 1);
                        toast.success(t.skins.deleteSuccess(selectedSkin.id));
                    } else {
                        toast.error(res.error.message);
                    }
                }}
                onClose={onClose}
                labels={{
                    title: selectedSkin.name,
                    id: t.skins.id,
                    rarity: t.skins.rarity,
                    createdAt: t.skins.createdAt,
                    update: t.common.update,
                    delete: t.common.delete,
                }}
            />
        );
    }

    function renderCreateSkinModal() {
        if (!isCreateSkinModalModalOpen) return null;
        return (
            <CreateSkinModal
                onClose={() => setCreateSkinModalModalOpen(false)}
                onCreate={(skin) => {
                    setTableVersion(v => v + 1);
                    toast.success(t.skins.createSuccess(skin.id));
                }}
                labels={{
                    title: t.skins.create,
                    name: t.skins.name,
                    rarity: t.skins.rarity,
                    submit: t.common.create,
                }}
            />
        );
    }

    function renderUpdateSkinModal() {
        if (!isUpdateSkinModalModalOpen || !selectedSkin) return null;
        return (
            <UpdateSkinModal
                onClose={() => setUpdateSkinModalModalOpen(false)}
                onUpdate={() => {
                    setSelectedSkin(null);
                    setTableVersion(v => v + 1);
                    toast.success(t.skins.updateSuccess(selectedSkin.id));
                }}
                skin={selectedSkin}
                labels={{
                    title: t.skins.update,
                    name: t.skins.name,
                    rarity: t.skins.rarity,
                    submit: t.common.update,
                }}
            />
        );
    }

    return (
        <>
            <PaginatedTable<Skin>
                fetcher={fetchSkins}
                perPage={8}
                columns={columns}
                onRowClick={setSelectedSkin}
                refreshKey={tableVersion}
                header={renderPaginatedTableHeader}
                labels={{
                    error: t.errors.serverNotResponded,
                    noData: t.skins.noData,
                    prev: t.pagination.prev,
                    next: t.pagination.next,
                    page: t.pagination.page,
                }}
            />

            {renderPreviewSkinModal()}
            {renderUpdateSkinModal()}
            {renderCreateSkinModal()}
        </>
    );
}