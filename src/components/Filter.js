import React from "react";

function Filter ({ search, onSearchChange, onCategoryChange }) {
  function handleSearchChange(event) {
    onSearchChange(event.target.value);
  }

  return (
    <div className="Filter">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
      <select name="filter" onChange={onCategoryChange}>
        <option value="all">Filter by category</option>
        <option value="kitchenware">Kitchenware</option>
        <option value="clothing">Clothing</option>
        <option value="electricals">Electricals</option>
      </select>
    </div>
  );
}

export default Filter;