import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchEntities } from '../services/swapi';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        try {
          const searchResults = await searchEntities(query);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleResultClick = (result) => {
    navigate(`/details/${result.type}/${result.uid}`);
    setQuery('');
    setShowResults(false);
  };

  const getEntityTypeLabel = (type) => {
    if (type === 'people') return 'Character';
    if (type === 'vehicles') return 'Vehicle';
    if (type === 'planets') return 'Planet';
    return type;
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search characters, vehicles, planets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
        />
        {loading && <div className="search-loading">Searching...</div>}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.uid}`}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              <div className="search-result-name">{result.name}</div>
              <div className="search-result-type">{getEntityTypeLabel(result.type)}</div>
            </div>
          ))}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && !loading && (
        <div className="search-results">
          <div className="search-no-results">No results found</div>
        </div>
      )}
    </div>
  );
};
