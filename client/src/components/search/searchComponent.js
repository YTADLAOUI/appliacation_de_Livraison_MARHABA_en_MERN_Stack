import React from "react";
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const searchValue = event.target.elements.searchInput.value;
    //   navigate.push(`/restaurant/search/${encodeURIComponent(searchValue)}`);
    navigate(`/restaurant/search/?name=${encodeURIComponent(searchValue)}`);

      
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="search d-flex">
          <i className="fa fa-search"></i>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Would you like to search for a restaurant? Search Now"
            name="searchInput"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  };

export default SearchComponent;  