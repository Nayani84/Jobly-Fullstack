import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(inputValue);
    setInputValue("");
  }

  return (
    <div className="SearchBar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchBar;