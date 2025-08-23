import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => setMeal(res.data.meals[0]))
      .catch((err) => console.error("Error fetching meal details:", err));

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Loading recipe details...</p>;

  // Collect ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  // Add to favorites handler
  const addToFavorites = () => {
    const isAlreadyFav = favorites.some((fav) => fav.idMeal === meal.idMeal);
    if (!isAlreadyFav) {
      const updatedFavorites = [...favorites, meal];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Recipe added to favorites!");
    } else {
      alert("This recipe is already in your favorites.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 underline">← Back to Recipes</Link>

      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-lg mb-6" />

      <button
        onClick={addToFavorites}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add to Favorites
      </button>

      <p className="text-lg mb-2">
        <strong>Category:</strong> {meal.strCategory} | <strong>Area:</strong> {meal.strArea}
      </p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-4">
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions</h2>
      <p className="mb-6 whitespace-pre-line">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Video Tutorial</h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
