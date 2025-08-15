import { useState, useEffect } from "react";

export default function SearchFilter({ onSearch, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 px-4 py-2 border rounded"
      />
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
