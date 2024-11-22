import React, { useState } from "react";
import "./../styles/components/searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    //
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a cryptocurrency..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;