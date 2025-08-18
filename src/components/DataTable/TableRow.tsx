import React, { memo, useCallback } from 'react';
import { Column } from '../../types/schema';
import { Checkbox } from '../ui/Checkbox';

interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: (row: T) => void;
}

export const TableRow = memo(<T,>({
  row,
  columns,
  selectable = false,
  isSelected = false,
  onSelect
}: TableRowProps<T>) => {
  const handleRowClick = useCallback((e: React.MouseEvent) => {
    // Prevent row selection when clicking on checkbox
    if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    
    if (selectable && onSelect) {
      onSelect(row);
    }
  }, [selectable, onSelect, row]);

  const handleCheckboxChange = useCallback(() => {
    if (onSelect) {
      onSelect(row);
    }
  }, [onSelect, row]);

  return (
    <tr 
      className={`
        hover:bg-gray-50 transition-colors duration-150
        ${selectable ? 'cursor-pointer' : ''}
        ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
      `}
      onClick={handleRowClick}
    >
      {selectable && (
        <td className="w-12 px-6 py-4">
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
        </td>
      )}
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="flex items-center">
            {String(row[column.dataIndex])}
          </div>
        </td>
      ))}
    </tr>
  );
}) as <T>(props: TableRowProps<T>) => JSX.Element;