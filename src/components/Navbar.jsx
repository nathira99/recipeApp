import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => setCategories(res.data.meals))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    onCategoryChange(category); // update recipes in parent
    navigate("/"); // always show recipes page when category changes
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-400 font-semibold">
          Home
        </Link>
        <Link to="/favorites" className="hover:text-yellow-400 font-semibold">
          Favorites
        </Link>
      </div>

      {/* Category Dropdown */}
      <select
        onChange={handleCategorySelect}
        className="bg-gray-800 text-white p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </nav>
  );
}

export default Navbar;
