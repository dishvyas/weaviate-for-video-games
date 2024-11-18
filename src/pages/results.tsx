import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { searchWeaviate } from '../services/weaviateService';
import SearchResults from '../components/SearchResults';

interface Result {
  name: string;
  price: string;
  description: string;
}

const ResultsPage: React.FC = () => {
    const router = useRouter();
    const { query } = router.query;
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (query) {
        searchWeaviate(query as string)
          .then((data) => {
            setResults(data);
            setError(null); // Clear any previous error
          })
          .catch((err) => {
            console.error("Search error:", err);
            setError("Failed to retrieve results. Please try again.");
          });
      }
    }, [query]);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
        {error && <p className="text-red-500">{error}</p>}
        <SearchResults results={results} />
      </div>
    );
  };

export default ResultsPage;