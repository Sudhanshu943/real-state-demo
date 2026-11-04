import type { Filters, CollectionId, Aspect, UnitStatus } from '../../domain/types';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  resultCount: number;
  totalCount: number;
  selectedFloor?: number;
  onClearFloor?: () => void;
  onClearFilters: () => void;
}

export function FilterBar({
  filters,
  onFilterChange,
  resultCount,
  totalCount,
  selectedFloor,
  onClearFloor,
  onClearFilters
}: FilterBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-line)',
        marginBottom: '16px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600 }}>
          Filter Residences
        </span>
        <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
          Showing {resultCount} of {totalCount} example homes
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
        {/* Collection Filter */}
        <div>
          <label htmlFor="filter-collection" style={{ display: 'block', fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
            Collection
          </label>
          <select
            id="filter-collection"
            value={filters.collection}
            onChange={(e) => onFilterChange({ ...filters, collection: e.target.value as CollectionId | 'all' })}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-line)',
              backgroundColor: '#FFFFFF',
              fontSize: '13px'
            }}
          >
            <option value="all">All Collections</option>
            <option value="garden">Garden Residence</option>
            <option value="skyline">Skyline Residence</option>
            <option value="penthouse">Terrace Penthouse</option>
          </select>
        </div>

        {/* Aspect Filter */}
        <div>
          <label htmlFor="filter-aspect" style={{ display: 'block', fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
            Orientation
          </label>
          <select
            id="filter-aspect"
            value={filters.aspect}
            onChange={(e) => onFilterChange({ ...filters, aspect: e.target.value as Aspect | 'all' })}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-line)',
              backgroundColor: '#FFFFFF',
              fontSize: '13px'
            }}
          >
            <option value="all">All Aspects</option>
            <option value="west">West Aspect</option>
            <option value="east">East Aspect</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="filter-status" style={{ display: 'block', fontSize: '11px', color: 'var(--color-muted)', marginBottom: '4px' }}>
            Status
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value as UnitStatus | 'all' })}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-line)',
              backgroundColor: '#FFFFFF',
              fontSize: '13px'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="available">Available Only</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Active Floor or Filters Reset Action */}
      {(selectedFloor || filters.collection !== 'all' || filters.aspect !== 'all' || filters.status !== 'all') && (
        <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-line)' }}>
          {(filters.collection !== 'all' || filters.aspect !== 'all' || filters.status !== 'all') && (
            <button
              onClick={onClearFilters}
              style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}
            >
              Clear Filters
            </button>
          )}
          {selectedFloor && onClearFloor && (
            <button
              onClick={onClearFloor}
              style={{ fontSize: '12px', color: 'var(--color-bronze)', fontWeight: 600 }}
            >
              See All Example Floors
            </button>
          )}
        </div>
      )}
    </div>
  );
}
