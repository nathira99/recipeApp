import { useState, useEffect } from "react";

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
        <p className="text-gray-500 text-sm">{recipe.strCategory}</p>
        <div className="flex justify-between mt-3">
          <a
            href={`/recipe/${recipe.idMeal}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </a>
          <button
            onClick={toggleFavorite}
            className={`px-3 py-1 rounded ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
