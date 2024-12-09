import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCrypto } from "../api/coinGecko";
import { useTheme } from "../context/ThemeContext";

const SearchBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      const fetchResults = async () => {
        const data = await searchCrypto(query);
        setResults(data);
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/details/${results[0].id}`);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="search-container">
      <header>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Mode Sombre" : "Mode Clair"}
        </button>
      </header>
      <h1>Rechercher une cryptomonnaie</h1>
      <form onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Entrez le nom de la crypto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((crypto) => (
            <li
              key={crypto.id}
              className="result-item"
              onClick={() => handleResultClick(crypto.id)}
            >
              <img src={crypto.thumb} alt={crypto.name} />
              <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;