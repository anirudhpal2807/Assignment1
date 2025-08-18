import { useState, useCallback } from 'react';

export const useRowSelection = <T extends { id: number | string }>(data: T[]) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const isRowSelected = useCallback((row: T): boolean => {
    return selectedRows.some(selectedRow => selectedRow.id === row.id);
  }, [selectedRows]);

  const toggleRowSelection = useCallback((row: T) => {
    setSelectedRows(prev => {
      const isSelected = prev.some(selectedRow => selectedRow.id === row.id);
      if (isSelected) {
        return prev.filter(selectedRow => selectedRow.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  }, []);

  const toggleAllSelection = useCallback(() => {
    setSelectedRows(prev => {
      if (prev.length === data.length) {
        return [];
      } else {
        return [...data];
      }
    });
  }, [data]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  const isAllSelected = selectedRows.length === data.length && data.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  return {
    selectedRows,
    isRowSelected,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    isAllSelected,
    isIndeterminate
  };
};