// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product name..."
        className="px-4 py-2 border rounded-l-md w-80 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;