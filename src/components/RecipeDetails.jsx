import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals?.[0] || null));
  }, [id]);

  if (!recipe) return <p className="text-center">Loading...</p>;

  // Extract ingredients & measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mb-4 text-blue-500 hover:underline font-semibold"
      >
        ⬅ Back to Recipes
      </Link>

      <div className="bg-white p-6 rounded shadow">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">{recipe.strMeal}</h2>
        <p className="text-gray-500 mb-4">
          Category: <span className="font-medium">{recipe.strCategory}</span> |{" "}
          Cuisine: <span className="font-medium">{recipe.strArea}</span>
        </p>

        {/* Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-lg mx-auto rounded mb-6"
        />

        {/* Ingredients */}
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-6">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="mb-6 whitespace-pre-line">{recipe.strInstructions}</p>

        {/* Video Link */}
        {recipe.strYoutube && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Video Tutorial</h3>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
