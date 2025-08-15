export default function Footer() {
  return (
    <footer className="bg-white border-t shadow-md mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        
        {/*About */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-blue-600">🍽️ Recipe App</h2>
          <p className="text-sm font-medium my-4 mr-4">
            Discover, search, and save your favorite meals from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <a href="/" className="text-md hover:text-blue-500 transition">Home</a>
          <a href="/favorites" className="text-md hover:text-blue-500 transition">Favorites</a>
          <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer" className="text-md hover:text-blue-500 transition">
            TheMealDB API
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <img src="../src/assets/facebook_icon.png" alt="" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <img src="../src/assets/twitter_icon.png" alt="twitter" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <img src="../src/assets/discord_icon.png" alt="icon" />
          </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Recipe App — All rights reserved.
      </div>
    </footer>
  );
}