import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p className="text-center mt-10">No favorite recipes yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((meal) => (
          <div
            key={meal.idMeal}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
            <p className="text-sm text-gray-500">Category: {meal.strCategory}</p>
            <div className="flex justify-between mt-3">
              <Link
                to={`/recipe/${meal.idMeal}`}
                className="text-blue-500 underline"
              >
                View Details
              </Link>
              <button
                onClick={() => removeFromFavorites(meal.idMeal)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
