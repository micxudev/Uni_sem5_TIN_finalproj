import type {ReactNode} from "react";
import "../../styles/components/Table.css";

export interface Column<T> {
    key: string;
    header: string;
    render: (row: T) => ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
}

export function Table<T>({data, columns, onRowClick}: TableProps<T>) {
    return (
        <table className="table">
            <thead>
            <tr>
                {columns.map(col => (
                    <th key={col.key}>{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr
                    key={i}
                    onClick={() => onRowClick?.(row)}
                    className={onRowClick ? "table__row--clickable" : ""}
                >
                    {columns.map(col => (
                        <td key={col.key}>{col.render(row)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}