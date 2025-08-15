import { Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">🍽️ Recipe App</h1>
        <nav className="flex gap-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="text-blue-500 hover:underline">
            Favorites
          </Link>
        </nav>
      </header>

   <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow pt-20 px-4">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>

      <Footer />
    </div> 
    </div>
  );
}

export default App;
