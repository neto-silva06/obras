import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export function DataTable({ columns, data, isLoading = false, emptyMessage = "Nenhum registro encontrado." }) {
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center p-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" }) }));
    }
    if (data.length === 0) {
        return (_jsx("div", { className: "text-center p-8 text-gray-500", children: emptyMessage }));
    }
    return (_jsx("div", { className: "overflow-x-auto bg-white rounded-lg shadow", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsx("tr", { children: columns.map((col, index) => (_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: col.header }, index))) }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: data.map((item, rowIndex) => (_jsx("tr", { className: "hover:bg-gray-50 transition-colors", children: columns.map((col, colIndex) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-700", children: typeof col.accessor === 'function'
                                ? col.accessor(item)
                                : item[col.accessor] }, colIndex))) }, rowIndex))) })] }) }));
}
//# sourceMappingURL=DataTable.js.map