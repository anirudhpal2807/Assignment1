// String formatters for components
export const formatRowCount = (count: number): string => {
  if (count === 0) return 'No rows selected';
  if (count === 1) return '1 row selected';
  return `${count} rows selected`;
};

export const formatSortDirection = (direction: 'asc' | 'desc' | null): string => {
  if (direction === 'asc') return 'Sort ascending';
  if (direction === 'desc') return 'Sort descending';
  return 'Sort';
};