import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Gestion des redirections
import { searchCrypto } from "../api/coinGecko";
import "../styles/components/searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 2) {
      const data = await searchCrypto(input);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleCryptoClick = (cryptoId) => {
    navigate(`/details/${cryptoId}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Rechercher une cryptomonnaie..."
        value={query}
        onChange={handleSearch}
      />
      <ul className="results-list">
        {query.length > 2 && results.length === 0 ? (
          <li className="result-item">Aucune cryptomonnaie trouvée</li>
        ) : (
          results.map((crypto) => (
            <li
              key={crypto.id}
              className="result-item"
              onClick={() => handleCryptoClick(crypto.id)}
            >
              <img src={crypto.thumb} alt={crypto.name} />
              <span>{crypto.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBar;