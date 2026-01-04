import {useState} from "react";
import {toast} from "react-toastify";
import {type PaginatedResult, type Skin, UserRoleValues} from "@shared";

import {fetchSkins} from "../api/api.skins.ts";

import {PaginatedTable} from "../components/PaginatedTable/PaginatedTable";
import type {Column} from "../components/PaginatedTable/Table/types";

import {Modal} from "../components/Modal/Modal";
import {PreviewSkinModal} from "../components/SkinModal/Preview/PreviewSkinModal.tsx";
import {CreateSkinModal} from "../components/SkinModal/Actions/CreateSkinModal.tsx";
import {UpdateSkinModal} from "../components/SkinModal/Actions/UpdateSkinModal.tsx";

import {useI18n} from "../i18n/I18nContext.tsx";
import {useUser} from "../AuthContext/AuthContext.tsx";

export function SkinsPage() {
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [isCreateSkinModalModalOpen, setCreateSkinModalModalOpen] = useState(false);
    const [isUpdateSkinModalModalOpen, setUpdateSkinModalModalOpen] = useState(false);

    const t = useI18n();
    const user = useUser();
    const isAdmin = user?.role === UserRoleValues.ADMIN;
    const isUserSkinOwner = user?.id === selectedSkin?.createdBy;

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
        return <Modal onClose={() => setSelectedSkin(null)}>
            <PreviewSkinModal
                skin={selectedSkin}
                canUpdate={isAdmin && isUserSkinOwner}
                canDelete={isAdmin && isUserSkinOwner}
                onUpdate={() => setUpdateSkinModalModalOpen(true)}
                onDelete={() => console.log("delete", selectedSkin.id)}
                labels={{
                    title: selectedSkin.name,
                    id: t.skins.id,
                    rarity: t.skins.rarity,
                    createdAt: t.skins.createdAt,
                    update: t.common.update,
                    delete: t.common.delete,
                }}
            />
        </Modal>;
    }

    function renderCreateSkinModal() {
        if (!isCreateSkinModalModalOpen) return null;
        return (
            <Modal onClose={() => setCreateSkinModalModalOpen(false)}>
                <CreateSkinModal
                    onClose={() => setCreateSkinModalModalOpen(false)}
                    onCreate={(skin) => toast.success(t.skins.createSuccess(skin.id))}
                    labels={{
                        title: t.skins.create,
                        name: t.skins.name,
                        rarity: t.skins.rarity,
                        submit: t.common.create,
                    }}
                />
            </Modal>
        );
    }

    function renderUpdateSkinModal() {
        if (!isUpdateSkinModalModalOpen || !selectedSkin) return null;
        return (
            <Modal onClose={() => setUpdateSkinModalModalOpen(false)}>
                <UpdateSkinModal
                    onClose={() => setUpdateSkinModalModalOpen(false)}
                    onUpdate={() => toast.success(t.skins.updateSuccess)}
                    skin={selectedSkin}
                    labels={{
                        title: t.skins.update,
                        name: t.skins.name,
                        rarity: t.skins.rarity,
                        submit: t.common.update,
                    }}
                />
            </Modal>
        );
    }

    return (
        <>
            <PaginatedTable<Skin>
                fetcher={fetchSkins}
                perPage={8}
                columns={columns}
                onRowSelect={setSelectedSkin}
                header={renderPaginatedTableHeader}
                labels={{
                    error: t.errors.serverNotResponded,
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