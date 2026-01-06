import {useState} from "react";
import {type PaginatedResult, type User, UserRoleValues} from "@shared";
import {ErrorFlash} from "../components/ErrorFlash.tsx";

import {fetchUsers} from "../api/api.users.ts";

import type {Column} from "../components/PaginatedTable/Table.tsx";
import {PaginatedTable} from "../components/PaginatedTable/PaginatedTable";

import {PreviewUserModal} from "../components/Modals/PreviewUserModal.tsx";

import {useI18n} from "../contexts/I18nContext.tsx";
import {useUser} from "../contexts/AuthContext.tsx";

export function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const t = useI18n();
    const user = useUser();
    const isAdmin = user?.role === UserRoleValues.ADMIN;

    const columns: Column<User>[] = [
        {key: "id", header: t.users.id, render: u => u.id},
        {key: "username", header: t.users.username, render: u => u.username},
        {key: "role", header: t.users.role, render: u => u.role},
        {key: "createdAt", header: t.users.createdAt, render: u => new Date(u.createdAt).toLocaleString()},
        {
            key: "lastLootboxOpenedAt",
            header: t.users.lastLootboxOpenedAt,
            render: u => u.lastLootboxOpenedAt ? new Date(u.lastLootboxOpenedAt).toLocaleString() : "-"
        },
    ];

    if (!isAdmin) {
        return <ErrorFlash title={t.errors.unauthorized} error={t.errors.adminRequired}/>;
    }

    function renderPaginatedTableHeader(result: PaginatedResult<User>) {
        return (
            <div className="paginated-table__header">
                <h2>{result.meta.total} {t.users.title}</h2>
            </div>
        );
    }

    function renderPreviewUserModal() {
        if (!selectedUser) return null;
        return (
            <PreviewUserModal
                user={selectedUser}
                canViewUserSkins={isAdmin}
                onViewUserSkinsClick={(userId) => {
                    console.log("Display owned skins for user " + userId); // TODO: show owned user skins
                }}
                onClose={() => setSelectedUser(null)}
                labels={{
                    title: t.users.user,
                    id: t.users.id,
                    username: t.users.username,
                    role: t.users.role,
                    createdAt: t.users.createdAt,
                    lastLootboxOpenedAt: t.users.lastLootboxOpenedAt,
                    viewSkins: t.skin_ownership.viewOwnedSkins,
                }}
            />
        );
    }

    return (
        <>
            <PaginatedTable<User>
                fetcher={fetchUsers}
                perPage={8}
                columns={columns}
                onRowClick={setSelectedUser}
                header={renderPaginatedTableHeader}
                labels={{
                    error: t.errors.serverNotResponded,
                    noData: t.users.noData,
                    prev: t.pagination.prev,
                    next: t.pagination.next,
                    page: t.pagination.page,
                }}
            />
            {renderPreviewUserModal()}
        </>
    );
}