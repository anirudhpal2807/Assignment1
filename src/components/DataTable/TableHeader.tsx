import React, { memo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Column } from '../../types/schema';
import { Checkbox } from '../ui/Checkbox';
import { SortConfig } from '../../hooks/useTableSorting';

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  selectable?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: () => void;
}

export const TableHeader = memo(<T,>({
  columns,
  sortConfig,
  onSort,
  selectable = false,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll
}: TableHeaderProps<T>) => {
  const getSortIcon = useCallback((columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={14} className="text-gray-300" />;
    }
    
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={14} className="text-blue-600" />
    ) : (
      <ChevronDown size={14} className="text-blue-600" />
    );
  }, [sortConfig]);

  const handleSort = useCallback((columnKey: string) => {
    onSort(columnKey);
  }, [onSort]);

  const handleSelectAll = useCallback(() => {
    if (onSelectAll) {
      onSelectAll();
    }
  }, [onSelectAll]);

  return (
    <thead className="bg-gray-50">
      <tr>
        {selectable && (
          <th className="w-12 px-6 py-4 text-left">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.key}
            className={`
              px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
              ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors duration-150' : ''}
            `}
            onClick={() => column.sortable && handleSort(column.key)}
          >
            <div className="flex items-center space-x-2">
              <span>{column.title}</span>
              {column.sortable && getSortIcon(column.key)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}) as <T>(props: TableHeaderProps<T>) => JSX.Element;