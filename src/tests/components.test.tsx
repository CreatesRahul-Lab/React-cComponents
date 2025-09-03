// Component validation - Basic TypeScript compilation check
import React from 'react';
import InputField from '../components/InputField';
import DataTable, { type Column } from '../components/DataTable';

// Sample data for DataTable validation
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
];

const userColumns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: false }
];

// Validation function to ensure components can be instantiated
export function validateComponents(): boolean {
  try {
    // Validate InputField component props
    const inputFieldProps = {
      label: 'Test Input',
      placeholder: 'Enter text',
      value: '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value),
      variant: 'outlined' as const,
      size: 'md' as const,
      darkMode: false
    };

    // Validate DataTable component props
    const dataTableProps = {
      data: sampleUsers,
      columns: userColumns,
      loading: false,
      selectable: true,
      darkMode: false,
      onRowSelect: (users: User[]) => console.log('Selected:', users)
    };

    // Components should be valid React elements
    const inputElement = React.createElement(InputField, inputFieldProps);
    const tableElement = React.createElement(DataTable<User>, dataTableProps);

    return !!(inputElement && tableElement);
  } catch (error) {
    console.error('Component validation failed:', error);
    return false;
  }
}

// Export components for testing
export { InputField, DataTable };
export type { Column, User };
