import React, { useEffect, useState } from "react";
import axios from "axios";

function RecipeList({ selectedCategory, searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Fetch recipes
  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    if (selectedCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    }

    axios
      .get(url)
      .then((res) => {
        if (res.data.meals) {
          // Filter locally by search query
          const filtered = res.data.meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setRecipes(filtered);
        } else {
          setRecipes([]);
        }
      })
      .catch(() => {
        setError("Failed to fetch recipes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  // Toggle favorite
  const toggleFavorite = (meal) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      updatedFavorites = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    } else {
      updatedFavorites = [...favorites, meal];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((fav) => fav.idMeal === id);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Listings</h1>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-64 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && recipes.length === 0 && !error && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      {/* Recipe Grid */}
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold truncate">
                    {meal.strMeal}
                  </h2>
                  {meal.strCategory && (
                    <p className="text-sm text-gray-500">{meal.strCategory}</p>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(meal)}
                  className={`p-2 rounded-full transition ${
                    isFavorite(meal.idMeal)
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
