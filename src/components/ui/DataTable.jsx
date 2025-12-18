import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './DataTable.css';
import { cn } from '@/lib/utils';

const DataTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onRowSelect,
  selectable = false,
  pageSize = 10,
  showPagination = true,
  onPageSizeChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows(new Set());
  }, [data.length]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Handle boolean values
      if (typeof aValue === 'boolean') {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }

      // Handle string values
      if (typeof aValue === 'string') {
        const comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Handle number values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Fallback: convert to string and compare
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handle row selection
  const handleSelectRow = (rowIndex) => {
    if (!selectable) return;
    const actualIndex = startIndex + rowIndex;
    const newSelected = new Set(selectedRows);
    if (newSelected.has(actualIndex)) {
      newSelected.delete(actualIndex);
    } else {
      newSelected.add(actualIndex);
    }
    setSelectedRows(newSelected);
    if (onRowSelect) {
      onRowSelect(Array.from(newSelected).map(idx => sortedData[idx]));
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable) return;
    const allSelected = paginatedData.length === Array.from(selectedRows).filter(idx => idx >= startIndex && idx < endIndex).length;
    const newSelected = new Set(selectedRows);
    
    if (allSelected) {
      // Deselect all on current page
      paginatedData.forEach((_, idx) => {
        newSelected.delete(startIndex + idx);
      });
    } else {
      // Select all on current page
      paginatedData.forEach((_, idx) => {
        newSelected.add(startIndex + idx);
      });
    }
    setSelectedRows(newSelected);
    if (onRowSelect) {
      onRowSelect(Array.from(newSelected).map(idx => sortedData[idx]));
    }
  };

  // Check if all rows on current page are selected
  const allSelectedOnPage = paginatedData.length > 0 && 
    paginatedData.every((_, idx) => selectedRows.has(startIndex + idx));

  return (
    <div className="data-table-container">
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th className="data-table-header-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelectedOnPage}
                    onChange={handleSelectAll}
                    className="data-table-checkbox"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'data-table-header',
                    column.sortable && 'data-table-header-sortable'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="data-table-header-content">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="data-table-sort-icons">
                        <ChevronUp
                          className={cn(
                            'data-table-sort-icon',
                            sortConfig.key === column.key && sortConfig.direction === 'asc' && 'data-table-sort-icon-active'
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'data-table-sort-icon',
                            sortConfig.key === column.key && sortConfig.direction === 'desc' && 'data-table-sort-icon-active'
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="data-table-header data-table-header-actions">ACTIONS</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + ((onEdit || onDelete) ? 1 : 0)}
                  className="data-table-empty"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualRowIndex = startIndex + rowIndex;
                return (
                  <tr key={rowIndex} className="data-table-row">
                    {selectable && (
                      <td className="data-table-cell-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(actualRowIndex)}
                          onChange={() => handleSelectRow(rowIndex)}
                          className="data-table-checkbox"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="data-table-cell">
                        {column.render ? column.render(row[column.key], row, actualRowIndex) : row[column.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="data-table-cell data-table-cell-actions">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="data-table-action-button data-table-action-edit"
                            title="Edit"
                          >
                            <Edit className="data-table-action-icon" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="data-table-action-button data-table-action-delete"
                            title="Delete"
                          >
                            <Trash2 className="data-table-action-icon" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showPagination && sortedData.length > 0 && (
        <div className="data-table-pagination">
          <div className="data-table-pagination-left">
            <span className="data-table-pagination-info">
              Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
            </span>
          </div>
          <div className="data-table-pagination-right">
            <div className="data-table-pagination-page-size-wrapper">
              <label htmlFor="page-size-select" className="data-table-pagination-label">Rows per page:</label>
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => {
                  const newPageSize = Number(e.target.value);
                  setCurrentPage(1);
                  if (onPageSizeChange) {
                    onPageSizeChange(newPageSize);
                  }
                }}
                className="data-table-pagination-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="data-table-pagination-navigation">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="data-table-pagination-button data-table-pagination-button-prev"
                title="Previous"
              >
                <ChevronLeft className="data-table-pagination-icon" />
                <span>Previous</span>
              </button>
              <div className="data-table-pagination-page-numbers">
                <span className="data-table-pagination-page-info">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="data-table-pagination-button data-table-pagination-button-next"
                title="Next"
              >
                <span>Next</span>
                <ChevronRight className="data-table-pagination-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

