// /components/SearchComponent.tsx
import React, { useState, useEffect } from 'react';
import { VideoGameDataModel } from './DataDisplay';


interface SearchComponentProps {
  games: VideoGameDataModel[];
  onSearch: (filteredGames: VideoGameDataModel[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ games, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    const filteredGames = lowerCaseSearchTerm
      ? games.filter((game) => game.game_Title.toLowerCase().includes(lowerCaseSearchTerm))
      : games;

    onSearch(filteredGames);
  }, [searchTerm, games]);

  return (
    <input
      type="text"
      placeholder="Search games"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginRight: '10px', padding: '5px' }}
    />
  );
};

export default SearchComponent;