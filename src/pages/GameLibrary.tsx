// src/pages/GameLibrary.tsx
import React, { useEffect, useState, useRef } from 'react';
import { getAllGames } from '../services/weaviateService';
import DataDisplay from '../components/DataDisplay';
import FilterComponent from '@/components/FilterComponent';
import styles from '../../styles/GameLibrary.module.css';
import Navbar from '@/components/Navbar';
import { VideoGameDataModel } from '../components/DataDisplay';
import '../app/globals.css';
import SortComponent from '@/components/SortComponent';
import SearchComponent from '@/components/SearchComponent';


const GameLibrary: React.FC = () => {
  const [games, setGames] = useState<VideoGameDataModel[]>([]);
  const [filteredGames, setFilteredGames] = useState<VideoGameDataModel[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortOpen, setSortOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState<VideoGameDataModel[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<string>('');
  const [results, setResults] = useState<VideoGameDataModel[]>([]);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const columns = [
    "user_Rating", "price", "release_Year","game_Length","min_Number_of_Players"
  ];

  const sortOptions = [
    { label: 'Game Title: A to Z', column: 'game_Title', order: 'asc' },
    { label: 'Game Title: Z to A', column: 'game_Title', order: 'desc' },
    { label: 'User Rating: High to Low', column: 'user_Rating', order: 'desc' },
    { label: 'User Rating: Low to High', column: 'user_Rating', order: 'asc' },
    { label: 'Price: High to Low', column: 'price', order: 'desc' },
    { label: 'Price: Low to High', column: 'price', order: 'asc' },
    { label: 'Release Year: Newest to Oldest', column: 'release_Year', order: 'desc' },
    { label: 'Release Year: Oldest to Newest', column: 'release_Year', order: 'asc' },
  ];

  // Fetch data initially
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGames();
      setGames(data);
      setFilteredGames(data);
      setResults(data); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = games;
  
    // Apply search filter
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((game) =>
        game.game_Title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  
    // Apply filter changes (if any)
    if (showFilters) {
      filtered = filteredGames; // Ensure filter logic is applied
    }
  
    // Apply Sorting
    if (sortOption) {
      const { column, order } = sortOptions.find(
        (option) => option.label === sortOption
      ) || {};
      if (column && order) {
        filtered = [...filtered].sort((a, b) => {
          const aValue = a[column as keyof VideoGameDataModel];
          const bValue = b[column as keyof VideoGameDataModel];
  
          if (aValue < bValue) return order === 'asc' ? -1 : 1;
          if (aValue > bValue) return order === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }
  
    setResults([...filtered]); // Spread to ensure new reference
  }, [games, searchTerm, sortOption, filteredGames, showFilters]);



    const handleFilterChange = (filters: { [key: string]: string }) => {
        let filtered = games;
      
        Object.keys(filters).forEach((key) => {
          const filterValue = filters[key];
          if (filterValue) {
            filtered = filtered.filter((game) => {
              const gameValue = game[key];
              if (typeof gameValue === 'string') {
                return gameValue.toLowerCase().includes(filterValue.toLowerCase());
              } else if (typeof gameValue === 'number') {
                return gameValue === Number(filterValue);
              }
              return false;
            });
          }
        });
      
        setResults([...filtered]); // Update the main results state
      };


  const handleSortChange = (column: string, order: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortOrder(order);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setShowFilters(false); // Close dropdown if clicked outside
        }
        if (sortRef.current && !sortRef.current.contains(target)) {
            setSortOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters, sortOpen]);

  const toggleFilters = () => {
    setShowFilters((prev) => {
      if (!prev) setSortOpen(false); // Close sort dropdown if filter is opening
      return !prev;
    });
  };
  
  const toggleSort = () => {
    setSortOpen((prev) => {
      if (!prev) setShowFilters(false); // Close filter dropdown if sort is opening
      return !prev;
    });
  };


  const displayNames = {
    'user_Rating': "User Rating",
    'price': "Price",
    'release_Year': "Release Year",
    'game_Length': "Game Length",
    'min_Number_of_Players': "Minimum Players",
};

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-tr from-red-500 to-purple-400">
        <div className={styles.libraryContainer}>

    <div className={styles.searchFilterContainer}>
    <div className={styles.searchContainer} ref={filterRef}>
        <input
        type="text"
        placeholder="&#128270; Search"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.filterIconButton} onClick={toggleFilters}>
    <svg
        className={styles.filterIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
    {showFilters && (
            <FilterComponent
                data={games}
                onFilterChange={handleFilterChange}
                columns={columns}
                onSortChange={handleSortChange}
            />
    )}
</button>

    <div className={styles.sortContainer}>
        <button
        className={styles.sortIconButton}
        onClick={toggleSort}
        >
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

        {sortOpen && (
    <div className={styles.sortDropdown} ref={sortRef}>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Game Title: A to Z')}
    >
      Game Title: (A to Z)
    </div> 
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Game Title: Z to A')}
    >
      Game Title: (Z to A)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('User Rating: High to Low')}
    >
      User Rating (High to Low)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('User Rating: Low to High')}
    >
      User Rating (Low to High)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Price: Low to High')}
    >
      Price: Low to High
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Price: High to Low')}
    >
      Price: High to Low
    </div>
    {/* <div
      className={styles.sortOption}
      onClick={() => setSortOption('Release Year: Newest to Oldest')}
    >
      Release Year: Newest to Oldest
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Release Year: Oldest to Newest')}
    >
      Release Year: Oldest to Newest
    </div> */}
  </div>
)}
    </div>
    </div>
    
    </div>

    {/* Full-Width DataDisplay Section */}
    <div className={styles.cardsContainer}>
    {results.length > 0 ? (
      // Pass results to DataDisplay for rendering
      <DataDisplay
  games={results}
  searchTerm={searchTerm}
  key={JSON.stringify(results)}
  onRender={() => console.log("Rendering DataDisplay with games:", results)}
/>
    ) : (
      <p>No results found.</p>
    )}
    {/* <h2>Results</h2>
      <ul color='black'>
        {results.length > 0 ? (
          results.map((game, index) => (
            <li key={index}>
              {game.game_Title} - Rating: {game.user_Rating} - Price: ${game.price.toFixed(2)}
            </li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul> */}
    </div>
    </div>
    </div>
    </>
  );
};

export default GameLibrary;