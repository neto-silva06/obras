import React from 'react';
interface DataTableProps<T> {
    columns: {
        header: string;
        accessor: keyof T | ((item: T) => React.ReactNode);
    }[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
}
export declare function DataTable<T>({ columns, data, isLoading, emptyMessage }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DataTable.d.ts.map