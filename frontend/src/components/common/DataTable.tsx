import React from 'react';
import { Spinner } from '../ui/Spinner.js';

interface DataTableProps<T> {
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
  }[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "Nenhum registro encontrado."
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-12 bg-white rounded-lg border border-secondary-200">
        <Spinner />
        <p className="mt-4 text-sm text-secondary-500">Buscando dados...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-secondary-200 border-dashed">
        <p className="text-secondary-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-secondary-200 shadow-sm -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-secondary-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-200">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-secondary-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : (item as any)[col.accessor as string]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
