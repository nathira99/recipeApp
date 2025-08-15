import { useEffect, useMemo, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState([]);
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

        // Get categories
        const catRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const catData = await catRes.json();
        const categories = catData?.meals || [];

        // Fetch meals for each category
        const categoryRequests = categories.map((c) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              c.strCategory
            )}`
          ).then((r) => r.json())
        );
        const categoryResults = await Promise.all(categoryRequests);

        // Combine all meals, remove duplicates, sort
        const allMeals = categoryResults.flatMap((d) => d?.meals || []);
        const uniqueMealsMap = new Map(allMeals.map((m) => [m.idMeal, m]));
        const uniqueMeals = Array.from(uniqueMealsMap.values()).sort(compareByName);

        setRecipeList(uniqueMeals);
      } catch (e) {
        console.error("Failed to load recipes:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchAllMeals();
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipeList;
    const term = searchTerm.toLowerCase();
    return recipeList
      .filter((r) => r.strMeal?.toLowerCase().includes(term))
      .sort(compareByName);
  }, [recipeList, searchTerm]);

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
    return <p className="text-center mt-10">Loading recipes…</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes…"
        className="w-full border p-2 rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Recipe Grid */}
      {currentRecipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            ⏮
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            ⬅ Prev
          </button>

          {getPageWindow().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-lg border transition ${
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
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            Next ➡
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            ⏭
          </button>
        </div>
      )}
    </div>
  );
}
