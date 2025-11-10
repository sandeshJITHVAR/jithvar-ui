import React, { useState, useEffect, useCallback } from 'react';
import { DateRangePicker, DateRange } from './DateRangePicker';
import { RangeSlider } from './RangeSlider';
import './DataTable.css';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  type?: 'text' | 'number' | 'date' | 'custom';
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

export interface DataTableProps {
  columns: Column[];
  apiUrl: string;
  apiHeaders?: Record<string, string>;
  enableUniversalSearch?: boolean;
  enableColumnSearch?: boolean;
  enableSelection?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  rowKey?: string;
  onSelectionChange?: (selectedRows: any[]) => void;
  className?: string;
  emptyMessage?: string;
}

interface TableState {
  page: number;
  pageSize: number;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  universalSearch: string;
  columnFilters: Record<string, any>;
  selectedRows: string[];
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  apiUrl,
  apiHeaders = {},
  enableUniversalSearch = true,
  enableColumnSearch = true,
  enableSelection = true,
  enablePagination = true,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  rowKey = 'id',
  onSelectionChange,
  className = '',
  emptyMessage = 'No data available',
}) => {
  const [state, setState] = useState<TableState>(() => {
    // Initialize state from URL params
    const params = new URLSearchParams(window.location.search);
    return {
      page: parseInt(params.get('page') || '1'),
      pageSize: parseInt(params.get('pageSize') || String(defaultPageSize)),
      sortColumn: params.get('sortColumn'),
      sortDirection: (params.get('sortDirection') as 'asc' | 'desc') || 'asc',
      universalSearch: params.get('search') || '',
      columnFilters: {},
      selectedRows: [],
    };
  });

  const [data, setData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update URL when state changes
  const updateURL = useCallback((newState: TableState) => {
    const params = new URLSearchParams();
    
    params.set('page', String(newState.page));
    params.set('pageSize', String(newState.pageSize));
    
    if (newState.sortColumn) {
      params.set('sortColumn', newState.sortColumn);
      params.set('sortDirection', newState.sortDirection);
    }
    
    if (newState.universalSearch) {
      params.set('search', newState.universalSearch);
    }
    
    // Add column filters
    Object.entries(newState.columnFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object') {
          params.set(`filter_${key}`, JSON.stringify(value));
        } else {
          params.set(`filter_${key}`, String(value));
        }
      }
    });
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, []);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', String(state.page));
      params.set('pageSize', String(state.pageSize));
      
      if (state.sortColumn) {
        params.set('sortColumn', state.sortColumn);
        params.set('sortDirection', state.sortDirection);
      }
      
      if (state.universalSearch) {
        params.set('search', state.universalSearch);
      }
      
      // Add column filters
      Object.entries(state.columnFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (typeof value === 'object') {
            // For date ranges or number ranges
            if (value.startDate && value.endDate) {
              params.set(`${key}_start`, value.startDate.toISOString());
              params.set(`${key}_end`, value.endDate.toISOString());
            } else if (Array.isArray(value)) {
              params.set(`${key}_min`, String(value[0]));
              params.set(`${key}_max`, String(value[1]));
            }
          } else {
            params.set(key, String(value));
          }
        }
      });

      const url = `${apiUrl}?${params.toString()}`;
      const response = await fetch(url, { headers: apiHeaders });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle different API response formats
      setData(result.data || result.results || result);
      setTotalRecords(result.total || result.totalRecords || (result.data || result.results || result).length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [state, apiUrl, apiHeaders]);

  useEffect(() => {
    fetchData();
    updateURL(state);
  }, [state.page, state.pageSize, state.sortColumn, state.sortDirection, state.universalSearch, state.columnFilters]);

  const handleSort = (columnKey: string) => {
    setState((prev) => ({
      ...prev,
      sortColumn: columnKey,
      sortDirection: prev.sortColumn === columnKey && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  };

  const handleUniversalSearch = (value: string) => {
    setState((prev) => ({
      ...prev,
      universalSearch: value,
      page: 1,
    }));
  };

  const handleColumnFilter = (columnKey: string, value: any) => {
    setState((prev) => ({
      ...prev,
      columnFilters: {
        ...prev.columnFilters,
        [columnKey]: value,
      },
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setState((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = data.map((row) => row[rowKey]);
      setState((prev) => ({ ...prev, selectedRows: allIds }));
      onSelectionChange?.(data);
    } else {
      setState((prev) => ({ ...prev, selectedRows: [] }));
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    setState((prev) => {
      const newSelectedRows = checked
        ? [...prev.selectedRows, rowId]
        : prev.selectedRows.filter((id) => id !== rowId);
      
      const selectedData = data.filter((row) => newSelectedRows.includes(row[rowKey]));
      onSelectionChange?.(selectedData);
      
      return { ...prev, selectedRows: newSelectedRows };
    });
  };

  const totalPages = Math.ceil(totalRecords / state.pageSize);
  const allSelected = data.length > 0 && state.selectedRows.length === data.length;
  const someSelected = state.selectedRows.length > 0 && !allSelected;

  const renderColumnFilter = (column: Column) => {
    if (!enableColumnSearch || !column.searchable) return null;

    const currentFilter = state.columnFilters[column.key];

    if (column.type === 'date') {
      return (
        <div className="jv-table-column-filter">
          <DateRangePicker
            value={currentFilter || { startDate: null, endDate: null }}
            onChange={(range) => handleColumnFilter(column.key, range)}
          />
        </div>
      );
    }

    if (column.type === 'number') {
      // Find min/max from data for the range slider
      const values = data.map((row) => row[column.key]).filter((v) => typeof v === 'number');
      const min = Math.min(...values, 0);
      const max = Math.max(...values, 100);

      return (
        <div className="jv-table-column-filter">
          <RangeSlider
            min={min}
            max={max}
            value={currentFilter || [min, max]}
            onChange={(range) => handleColumnFilter(column.key, range)}
          />
        </div>
      );
    }

    return (
      <div className="jv-table-column-filter">
        <input
          type="text"
          className="jv-table-search-input"
          placeholder={`Search ${column.label}...`}
          value={currentFilter || ''}
          onChange={(e) => handleColumnFilter(column.key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className={`jv-data-table ${className}`}>
      {/* Universal Search */}
      {enableUniversalSearch && (
        <div className="jv-table-header">
          <div className="jv-table-universal-search">
            <input
              type="text"
              className="jv-table-search-input jv-table-universal-search-input"
              placeholder="Search across all columns..."
              value={state.universalSearch}
              onChange={(e) => handleUniversalSearch(e.target.value)}
            />
            <span className="jv-table-search-icon">🔍</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="jv-table-container">
        {loading && (
          <div className="jv-table-loading-overlay">
            <div className="jv-table-spinner"></div>
            <span>Loading...</span>
          </div>
        )}

        {error && (
          <div className="jv-table-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <table className="jv-table">
          <thead>
            <tr>
              {enableSelection && (
                <th className="jv-table-checkbox-column">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="jv-table-checkbox"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={column.sortable ? 'jv-table-sortable' : ''}
                >
                  <div className="jv-table-header-content">
                    <span onClick={() => column.sortable && handleSort(column.key)}>
                      {column.label}
                      {column.sortable && (
                        <span className="jv-table-sort-icon">
                          {state.sortColumn === column.key
                            ? state.sortDirection === 'asc'
                              ? ' ↑'
                              : ' ↓'
                            : ' ↕'}
                        </span>
                      )}
                    </span>
                  </div>
                  {renderColumnFilter(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading && !error && data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (enableSelection ? 1 : 0)} className="jv-table-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row[rowKey]} className={state.selectedRows.includes(row[rowKey]) ? 'jv-table-row-selected' : ''}>
                  {enableSelection && (
                    <td className="jv-table-checkbox-column">
                      <input
                        type="checkbox"
                        checked={state.selectedRows.includes(row[rowKey])}
                        onChange={(e) => handleSelectRow(row[rowKey], e.target.checked)}
                        className="jv-table-checkbox"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && totalRecords > 0 && (
        <div className="jv-table-footer">
          <div className="jv-table-page-size">
            <span>Show</span>
            <select
              value={state.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="jv-table-page-size-select"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="jv-table-pagination-info">
            Showing {(state.page - 1) * state.pageSize + 1} to{' '}
            {Math.min(state.page * state.pageSize, totalRecords)} of {totalRecords} entries
          </div>

          <div className="jv-table-pagination">
            <button
              className="jv-table-pagination-btn"
              onClick={() => handlePageChange(1)}
              disabled={state.page === 1}
            >
              ««
            </button>
            <button
              className="jv-table-pagination-btn"
              onClick={() => handlePageChange(state.page - 1)}
              disabled={state.page === 1}
            >
              ‹
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (state.page <= 3) {
                pageNum = i + 1;
              } else if (state.page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = state.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`jv-table-pagination-btn ${state.page === pageNum ? 'jv-table-pagination-btn-active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="jv-table-pagination-btn"
              onClick={() => handlePageChange(state.page + 1)}
              disabled={state.page === totalPages}
            >
              ›
            </button>
            <button
              className="jv-table-pagination-btn"
              onClick={() => handlePageChange(totalPages)}
              disabled={state.page === totalPages}
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
