import { useState, useCallback, useMemo } from 'react';

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}

export const useTableSorting = <T>(data: T[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key, direction: 'asc' };
    });
  }, []);

  return {
    sortedData,
    sortConfig,
    handleSort
  };
};