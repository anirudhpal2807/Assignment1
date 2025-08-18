// Props types (data passed to components)
export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

// Store types (global state data)
export interface TableState {
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc' | null;
  selectedRows: any[];
}

// Query types (API response data)
export interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}