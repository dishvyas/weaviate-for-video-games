// /pages/test.tsx
import React, { useState, useEffect } from 'react';
import { getAllGames } from '@/services/weaviateService';
import styles from '../../styles/GameLibrary.module.css';

interface VideoGameDataModel {
  [key: string]: any;
  game_Title: string;
  user_Rating: number;
  age_Group_Targeted: string;
  price: number;
  platform: string;
  requires_Special_Device: string;
  developer: string;
  publisher: string;
  release_Year: number;
  genre: string;
  multiplayer: string;
  game_Length: number;
  graphics_Quality: string;
  soundtrack_Quality: string;
  story_Quality: string;
  user_Review_Text: string;
  game_Mode: string;
  min_Number_of_Players: number;
}

const TestSortingSearching: React.FC = () => {
  const [games, setGames] = useState<VideoGameDataModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<string>('');
  const [results, setResults] = useState<VideoGameDataModel[]>([]);

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

  // Fetch the data initially
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGames();
      setGames(data);
      setResults(data); // Initialize results to all games
    };
    fetchData();
  }, []);

  // Handle Search and Sorting
  useEffect(() => {
    let filteredGames = games;

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      filteredGames = games.filter((game) =>
        game.game_Title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply Sorting
    if (sortOption) {
      const { column, order } = sortOptions.find(
        (option) => option.label === sortOption
      ) || {};
      if (column && order) {
        filteredGames = [...filteredGames].sort((a, b) => {
          const aValue = a[column as keyof VideoGameDataModel];
          const bValue = b[column as keyof VideoGameDataModel];

          if (aValue < bValue) return order === 'asc' ? -1 : 1;
          if (aValue > bValue) return order === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    setResults(filteredGames);
  }, [searchTerm, sortOption, games]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Sorting and Searching</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">Sort by</option>
          {sortOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.sortDropdown}>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('User Rating (High to Low)')}
    >
      User Rating (High to Low)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('User Rating (Low to High)')}
    >
      User Rating (Low to High)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Price (Low to High)')}
    >
      Price: Low to High
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Price (High to Low)')}
    >
      Price: High to Low
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Game Length (Longest to Shortest)')}
    >
      Game Length (Longest to Shortest)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Game Length (Shortest to Longest)')}
    >
      Game Length (Shortest to Longest)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Release Year (Newest to Oldest)')}
    >
      Release Year: Newest to Oldest
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Release Year (Oldest to Newest)')}
    >
      Release Year: Oldest to Newest
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Minimum Players (Most to Least)')}
    >
      Minimum Players (Most to Least)
    </div>
    <div
      className={styles.sortOption}
      onClick={() => setSortOption('Minimum Players (Least to Most)')}
    >
      Minimum Players (Least to Most)
    </div>
  </div>
      <h2>Results</h2>
      <ul>
        {results.length > 0 ? (
          results.map((game, index) => (
            <li key={index}>
              {game.game_Title} - Rating: {game.user_Rating} - Price: ${game.price.toFixed(2)}
            </li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default TestSortingSearching;