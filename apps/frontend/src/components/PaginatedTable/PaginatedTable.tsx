import type {ReactNode} from "react";
import {useEffect, useState} from "react";
import type {ApiErrorPayload, ApiResponse, PaginatedResult} from "@shared";
import type {Column} from "./Table/types.ts";
import {Table} from "./Table/Table.tsx";
import {PaginationControls} from "./PaginationControls/PaginationControls";
import "./PaginatedTable.css";
import {ErrorFlash} from "../ErrorFlash/ErrorFlash.tsx";

interface PaginatedTableProps<T> {
    fetcher: (page: number, perPage: number) => Promise<ApiResponse<PaginatedResult<T>>>;
    columns: Column<T>[];
    perPage: number;

    header?: (result: PaginatedResult<T>) => ReactNode;
    onRowSelect?: (row: T) => void;

    labels: {
        error: string;
        prev: string;
        next: string;
        page: string;
    };
}

export function PaginatedTable<T>({fetcher, columns, perPage, header, onRowSelect, labels,}: PaginatedTableProps<T>) {
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
    }, [page, perPage]);

    if (error)
        return <ErrorFlash title={error?.code} error={labels.error}/>;

    if (!result) return null; // Loading state (show nothing for now)

    return (
        <div className="paginated-table">
            {header?.(result)}

            <Table
                data={result.data}
                columns={columns}
                onRowClick={onRowSelect}
            />

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