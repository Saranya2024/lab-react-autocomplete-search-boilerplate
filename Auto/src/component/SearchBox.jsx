import React, { useState, useEffect } from "react";
import countryData from "../resources/countryData.json";

const SearchBox = () => {
  const [text, setText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const suggestions = text
      ? countryData.filter((country) => country.name.toLowerCase().startsWith(text))
      : [];
    setFilteredSuggestions(suggestions);
  }, [text]); 

  const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    console.log("Escape key pressed!");
    setFilteredSuggestions([]);
  }
};

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); 

  const handleSearch = () => {
    console.log("Search:", text);
    setFilteredSuggestions([]);
  };

  return (
    <div className="search-box">
      <div className="search-heading">Search</div>
      <div className="search-container">
        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredSuggestions.length > 0 && (
        <div className="suggestions-container">
          {filteredSuggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;