import React from 'react';
import ResultCard from './ResultCard';

interface Result {
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

interface SearchResultsProps {
  results: Result[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="grid gap-4 p-4">
      {results.map((result, index) => (
        <div key={result.game_Title + index} className="border rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold">{result.game_Title}</h3>
          <p><strong>Rating:</strong> {result.user_Rating}</p>
          <p><strong>Genre:</strong> {result.genre}</p>
          <p><strong>Developer:</strong> {result.developer}</p>
          <p><strong>Publisher:</strong> {result.publisher}</p>
          <p><strong>Release Year:</strong> {result.release_Year}</p>
          <p><strong>Platform:</strong> {result.platform}</p>
          <p><strong>Multiplayer:</strong> {result.multiplayer}</p>
          <p><strong>Game Length:</strong> {result.game_Length} hours</p>
          <p><strong>Graphics Quality:</strong> {result.graphics_Quality}</p>
          <p><strong>Soundtrack Quality:</strong> {result.soundtrack_Quality}</p>
          <p><strong>Story Quality:</strong> {result.story_Quality}</p>
          <p><strong>Review:</strong> {result.user_Review_Text}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;



