import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  darkMode?: boolean;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  key: string | null;
  order: SortOrder;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  darkMode = false,
  emptyMessage = "No data available",
  rowKey = 'id',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortState, setSortState] = useState<SortState>({ key: null, order: null });

  // Get row key for a record
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index;
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.order) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortState.order === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  // Handle column sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prevState => {
      if (prevState.key !== column.key) {
        return { key: column.key, order: 'asc' };
      }
      
      switch (prevState.order) {
        case null:
          return { key: column.key, order: 'asc' };
        case 'asc':
          return { key: column.key, order: 'desc' };
        case 'desc':
          return { key: null, order: null };
        default:
          return { key: column.key, order: 'asc' };
      }
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, checked: boolean) => {
    const newSelectedRows = checked
      ? [...selectedRows, record]
      : selectedRows.filter(row => getRowKey(row, 0) !== getRowKey(record, 0));

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...sortedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Check if a row is selected
  const isRowSelected = (record: T): boolean => {
    return selectedRows.some(row => getRowKey(row, 0) === getRowKey(record, 0));
  };

  // Check if all rows are selected
  const isAllSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortState.key === column.key;
    const iconClass = `w-4 h-4 ml-1 transition-colors ${
      darkMode ? 'text-gray-400' : 'text-gray-500'
    }`;

    if (!isActive) {
      return (
        <div className="flex flex-col ml-1">
          <ChevronUpIcon className="w-3 h-3 -mb-1 text-gray-300" />
          <ChevronDownIcon className="w-3 h-3 text-gray-300" />
        </div>
      );
    }

    return sortState.order === 'asc' ? (
      <ChevronUpIcon className={iconClass} />
    ) : (
      <ChevronDownIcon className={iconClass} />
    );
  };

  // Table classes
  const tableClasses = `
    w-full
    border-collapse
    ${darkMode ? 'bg-gray-800' : 'bg-white'}
    rounded-lg
    overflow-hidden
    shadow-sm
    border
    ${darkMode ? 'border-gray-700' : 'border-gray-200'}
  `;

  const headerClasses = `
    ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
    ${darkMode ? 'text-gray-200' : 'text-gray-700'}
  `;

  const cellClasses = `
    px-6
    py-4
    text-sm
    ${darkMode ? 'text-gray-300' : 'text-gray-900'}
  `;

  const headerCellClasses = `
    px-6
    py-3
    text-left
    text-xs
    font-medium
    uppercase
    tracking-wider
    ${darkMode ? 'text-gray-300' : 'text-gray-500'}
  `;

  if (loading) {
    return (
      <div className={`rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className={`${headerClasses} px-6 py-3`}>
            <div className="flex space-x-4">
              {selectable && <div className="w-4 h-4 bg-gray-300 rounded"></div>}
              {columns.map((column) => (
                <div key={column.key} className="h-4 bg-gray-300 rounded flex-1"></div>
              ))}
            </div>
          </div>
          
          {/* Body skeleton */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
              <div className="flex space-x-4">
                {selectable && <div className="w-4 h-4 bg-gray-300 rounded"></div>}
                {columns.map((column) => (
                  <div key={column.key} className="h-4 bg-gray-300 rounded flex-1"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <div className={`rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-12 text-center`}>
        <div className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'} mb-2`}>
          No Data
        </div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className={tableClasses} role="table">
        <thead className={headerClasses}>
          <tr>
            {selectable && (
              <th className={headerCellClasses} style={{ width: '48px' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className={`
                    w-4 h-4 rounded border
                    ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400 focus:ring-offset-gray-800' 
                      : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                    }
                    focus:ring-2 focus:ring-offset-2
                  `}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${headerCellClasses} ${column.sortable ? 'cursor-pointer hover:bg-opacity-75' : ''}`}
                onClick={() => handleSort(column)}
                aria-sort={
                  sortState.key === column.key
                    ? sortState.order === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                <div className="flex items-center">
                  {column.title}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {sortedData.map((record, index) => {
            const isSelected = isRowSelected(record);
            const rowKeyValue = getRowKey(record, index);
            
            return (
              <tr
                key={rowKeyValue}
                className={`
                  transition-colors
                  ${isSelected 
                    ? darkMode 
                      ? 'bg-blue-900 bg-opacity-25' 
                      : 'bg-blue-50'
                    : darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  }
                `}
              >
                {selectable && (
                  <td className={cellClasses}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(record, e.target.checked)}
                      className={`
                        w-4 h-4 rounded border
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400 focus:ring-offset-gray-800' 
                          : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                        }
                        focus:ring-2 focus:ring-offset-2
                      `}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className={cellClasses}>
                    {column.render 
                      ? column.render(record[column.dataIndex], record, index)
                      : String(record[column.dataIndex] ?? '')
                    }
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
