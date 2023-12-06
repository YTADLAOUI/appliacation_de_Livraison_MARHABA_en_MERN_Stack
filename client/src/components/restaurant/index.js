import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:1111/api/restaut/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:1111/api/restaut/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategoryId(null);
      setShowAllRestaurants(true);
    } else {
      setSelectedCategoryId(categoryId);
      setShowAllRestaurants(false);
    }
  };

  const filteredRestaurants = showAllRestaurants
    ? restaurants
    : selectedCategoryId
      ? restaurants.filter((restaurant) => restaurant.categories.includes(selectedCategoryId))
      : restaurants;

  return (
    <div className="container my-3">
      <h1>Restaurant</h1>
      <div className="my-3">
        <h4>Categories:</h4>
        <div className="btn-group" role="group">
          <button
            key="all"
            type="button"
            className={`btn btn-primary me-2 ${showAllRestaurants ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              className={`btn btn-primary me-2 ${selectedCategoryId === category._id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="col-md-4 my-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">{restaurant.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurant;