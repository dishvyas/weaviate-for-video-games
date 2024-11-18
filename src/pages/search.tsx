import React, { useState } from 'react';
import SearchBar from '../components/SearchBar'; // Adjust path as needed
import SearchResults from '../components/SearchResults'; // Adjust path as needed
import { getVideoGameSuggestions } from '../services/weaviateService'; // Adjust path as needed

// Define the expected data structure for search results
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

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the search request
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a valid search query.");
      setResults([]);
      return;
    }

    try {
      const data = await getVideoGameSuggestions(query);
      
      // If the data is null or undefined, handle it gracefully
      if (data) {
        setResults(data);
        setError(null);
      } else {
        setError("No results found.");
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError('Failed to retrieve data from Weaviate');
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Video Games</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <SearchResults results={results} />
    </div>
  );
};

export default SearchPage;