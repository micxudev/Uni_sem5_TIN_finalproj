import type {ReactNode} from "react";
import {useEffect, useState} from "react";
import type {ApiErrorPayload, ApiResponse, PaginatedResult} from "@shared";
import type {Column} from "../../lib/types.ts";
import {Table} from "./Table.tsx";
import {PaginationControls} from "./PaginationControls.tsx";
import "../../styles/components/PaginatedTable.css";
import {ErrorFlash} from "../ErrorFlash.tsx";

interface PaginatedTableProps<T> {
    fetcher: (page: number, perPage: number) => Promise<ApiResponse<PaginatedResult<T>>>;
    perPage: number;
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    refreshKey?: unknown;
    header?: (result: PaginatedResult<T>) => ReactNode;
    labels: {
        error: string;
        noData: string;
        prev: string;
        next: string;
        page: string;
    };
}

export function PaginatedTable<T>(
    {
        fetcher,
        perPage,
        columns,
        onRowClick,
        refreshKey,
        header,
        labels,
    }: PaginatedTableProps<T>) {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<PaginatedResult<T> | null>(null);
    const [error, setError] = useState<ApiErrorPayload | null>(null);

    useEffect(() => {
        setError(null);
        fetcher(page, perPage)
            .then(res => {
                if (res.success)
                    setResult(res.data);
                else
                    setError(res.error);
            })
    }, [page, perPage, refreshKey]);

    if (error) {
        return <ErrorFlash title={error.code} error={labels.error}/>;
    }

    if (!result) {
        return null; // Loading state (show nothing for now, could be a loader)
    }

    return (
        <div className="paginated-table">
            {header?.(result)}

            {result.data.length === 0 ? (
                <ErrorFlash error={labels.noData}/>
            ) : (
                <Table
                    data={result.data}
                    columns={columns}
                    onRowClick={onRowClick}
                />
            )}

            <PaginationControls
                currentPage={result.meta.current_page}
                lastPage={result.meta.last_page}
                onPrev={() => setPage(p => p - 1)}
                onNext={() => setPage(p => p + 1)}
                labels={{
                    prev: labels.prev,
                    next: labels.next,
                    page: labels.page,
                }}
            />
        </div>
    );
}