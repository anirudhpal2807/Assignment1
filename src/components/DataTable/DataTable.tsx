import React, { useEffect, memo, useCallback } from 'react';
import { DataTableProps } from '../../types/schema';
import { useTableSorting } from '../../hooks/useTableSorting';
import { useRowSelection } from '../../hooks/useRowSelection';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { formatRowCount } from '../../utils/stringFormatters';

export const DataTable = memo(<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect
}: DataTableProps<T>) => {
  const { sortedData, sortConfig, handleSort } = useTableSorting(data);
  const {
    selectedRows,
    isRowSelected,
    toggleRowSelection,
    toggleAllSelection,
    isAllSelected,
    isIndeterminate
  } = useRowSelection(sortedData);

  // Debounce row selection to prevent rapid state changes
  const debouncedOnRowSelect = useDebouncedCallback((rows: T[]) => {
    if (onRowSelect) {
      onRowSelect(rows);
    }
  }, 150);

  useEffect(() => {
    debouncedOnRowSelect(selectedRows);
  }, [selectedRows, debouncedOnRowSelect]);

  // Debounced sort handler to prevent rapid sorting
  const debouncedHandleSort = useDebouncedCallback(handleSort, 200);

  const handleRowSelection = useCallback((row: T) => {
    toggleRowSelection(row);
  }, [toggleRowSelection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size={24} />
          <span className="text-gray-500 text-lg">Loading data...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-500">There are no records to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {selectable && selectedRows.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-blue-700">
              {formatRowCount(selectedRows.length)}
            </p>
            <button
              onClick={toggleAllSelection}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto shadow-sm ring-1 ring-gray-300 rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={debouncedHandleSort}
            selectable={selectable}
            isAllSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
            onSelectAll={toggleAllSelection}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <TableRow
                key={`${row.id}-${index}`}
                row={row}
                columns={columns}
                selectable={selectable}
                isSelected={isRowSelected(row)}
                onSelect={handleRowSelection}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table footer with row count */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Showing {sortedData.length} {sortedData.length === 1 ? 'row' : 'rows'}</span>
        {selectable && (
          <span>{selectedRows.length} selected</span>
        )}
      </div>
    </div>
  );
}) as <T extends { id: number | string }>(props: DataTableProps<T>) => JSX.Element;