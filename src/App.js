import React, { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <Navbar onCategoryChange={setSelectedCategory} />
      <Routes>
        <Route path="/" element={<RecipeList selectedCategory={selectedCategory} />} />
        <Route path="/meal/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
