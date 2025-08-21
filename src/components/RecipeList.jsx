// src/components/RecipeList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const compareByName = (a, b) =>
    (a?.strMeal || "").localeCompare(b?.strMeal || "", undefined, {
      sensitivity: "base",
      numeric: true,
    });

  useEffect(() => {
    async function fetchAllMeals() {
      try {
        setLoading(true);

        // 1. Get all categories
        const catRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const catData = await catRes.json();
        const categories = catData?.meals || [];

        // 2. Get meals for each category
        const categoryRequests = categories.map((c) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              c.strCategory
            )}`
          ).then((r) => r.json())
        );
        const categoryResults = await Promise.all(categoryRequests);

        // 3. Merge & remove duplicates
        const allMeals = categoryResults.flatMap((d) => d?.meals || []);
        const uniqueMealsMap = new Map(allMeals.map((m) => [m.idMeal, m]));
        const uniqueMeals = Array.from(uniqueMealsMap.values());

        // 4. Sort alphabetically
        uniqueMeals.sort(compareByName);

        setRecipes(uniqueMeals);
      } catch (e) {
        console.error("Failed to load recipes:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchAllMeals();
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipes;
    const term = searchTerm.toLowerCase();
    return recipes
      .filter((r) => r.strMeal?.toLowerCase().includes(term))
      .sort(compareByName);
  }, [recipes, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);

  const getPageWindow = () => {
    const windowSize = Math.min(5, totalPages);
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + windowSize - 1);
    if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg font-medium text-gray-600">🍳 Fetching delicious recipes for you…</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search recipes by name..."
        className="w-full border p-3 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Recipes Grid */}
      {currentRecipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">😕 No recipes found. Try another search!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.idMeal}`}
              key={recipe.idMeal}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate text-gray-800">{recipe.strMeal}</h3>
                <p className="text-sm text-blue-500 mt-1">Click to view recipe ➜</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border font-medium transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            ⏮ First
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border font-medium transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            ◀ Previous
          </button>

          {getPageWindow().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                currentPage === pageNum
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            Next ▶
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            Last ⏭
          </button>
        </div>
      )}
    </div>
  );
}
