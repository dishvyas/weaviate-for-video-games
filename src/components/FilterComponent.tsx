import React, { useState } from 'react';
import type { VideoGameDataModel } from './DataDisplay';
import styles from '../../styles/GameLibrary.module.css';


interface FilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
  columns: string[];
  data: VideoGameDataModel[];
  onSortChange: (sortColumn: string, sortOrder: 'asc' | 'desc') => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange, columns, onSortChange }) => {
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleFilterChange = (column: string, value: any) => {
        // If the slider is moved back to the minimum, remove the filter
        if (numericColumns.includes(column) && value === numericRanges[column].min) {
          const { [column]: _, ...rest } = filters; // Remove the filter from the state
          setFilters(rest);
          onFilterChange(rest);
        } else {
          setFilters((prev) => ({ ...prev, [column]: value }));
          onFilterChange({ ...filters, [column]: value });
        }
      };
      const handleSortColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortColumn(e.target.value);
      };
    
      const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as 'asc' | 'desc');
      };
    
      const applySort = () => {
        onSortChange(sortColumn, sortOrder);
      };

  const numericRanges: { [key: string]: { min: number, max: number, step: number } } = {
    'user_Rating': { min: 0, max: 50, step: 0.1 },
    'price': { min: 0, max: 70, step: 1 },
    'release_Year': { min: 2010, max: 2023, step: 1 },
    'game_Length': { min: 0, max: 60, step: 1 },
    'min_Number_of_Players': { min: 1, max: 10, step: 1 },
  };

  const displayNames = {
    'user_Rating': "User Rating",
    'price': "Price",
    'release_Year': "Release Year",
    'game_Length': "Game Length",
    'min_Number_of_Players': "Minimum Players",
};

  const numericColumns: string[] = Object.keys(numericRanges);
return (
    <div className={styles.filterContainer}>
    {columns.map((column) => (
        <div key={column} className={styles.filterItem}>
            <label className={styles.filterLabel}>{displayNames[column as keyof typeof displayNames] || column.replace(/_/g, ' ')}</label>
            {numericColumns.includes(column) ? (
                // Slider for numeric fields
                <input
            type="range"
            min={(numericRanges as Record<string, { min: number; max: number; step: number }>)[column].min}
            max={(numericRanges as Record<string, { min: number; max: number; step: number }>)[column].max}
            step={(numericRanges as Record<string, { min: number; max: number; step: number }>)[column].step}
            value={filters[column] || (numericRanges as Record<string, { min: number; max: number; step: number }>)[column].min}
            onChange={(e) => handleFilterChange(column, Number(e.target.value))}
            className={styles.slider}
          />
            ) : (
                // Text input for non-numeric fields
                <input
                    type="text"
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                    className={styles.textInput}
                />
            )}
        </div>
    ))}
</div>
    
);
};

export default FilterComponent;

