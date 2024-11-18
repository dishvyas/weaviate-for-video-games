// /components/SortComponent.tsx
import React from 'react';
import styles from '../../styles/GameLibrary.module.css';

interface SortComponentProps {
  onSortChange: (column: string, order: 'asc' | 'desc') => void;
  isOpen: boolean;
  toggleSort: () => void;
}

interface SortOption {
    label: string;
    column: string;
    order: 'asc' | 'desc';
  }

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange, isOpen, toggleSort }) => {
  const sortOptions: SortOption[] = [
    { label: 'User Rating (High to Low)', column: 'user_Rating', order: 'desc' },
    { label: 'User Rating (Low to High)', column: 'user_Rating', order: 'asc' },
    { label: 'Price (Low to High)', column: 'price', order: 'asc' },
    { label: 'Price (High to Low)', column: 'price', order: 'desc' },
    { label: 'Game Length (Longest to Shortest)', column: 'game_Length', order: 'desc' },
    { label: 'Game Length (Shortest to Longest)', column: 'game_Length', order: 'asc' },
    { label: 'Release Year (Newest to Oldest)', column: 'release_Year', order: 'desc' },
    { label: 'Release Year (Oldest to Newest)', column: 'release_Year', order: 'asc' },
    { label: 'Minimum Players (Most to Least)', column: 'min_Number_of_Players', order: 'desc' },
    { label: 'Minimum Players (Least to Most)', column: 'min_Number_of_Players', order: 'asc' },
  ];

  return (
    <div>
      <button className={styles.sortIconButton} onClick={toggleSort}>
        <svg
          className={styles.sortIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M3 12h12M3 18h6" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.sortDropdown}>
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className={styles.sortOption}
              onClick={() => onSortChange(option.column, option.order)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortComponent;