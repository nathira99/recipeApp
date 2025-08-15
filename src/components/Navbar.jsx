// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🍽️ Recipe App
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Favorites
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col px-4 py-2 gap-2">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-blue-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
