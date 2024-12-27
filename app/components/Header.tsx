import { Search, Github, Sun } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full max-w-7xl bg-black border-b border-l border-r  border-white/10 position-sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section with logo and navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-cyan-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3.5 5.5L5 7l2.5-2.5m3.5 0L5 10.5m8-5.5L7 11m7.5-5.5L9 11m7.5-5.5L11 11m7.5-5.5L13 11" />
              </svg>
              <span className="ml-2 text-white font-semibold text-lg">TaskManager</span>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <a href="/docs" className="text-gray-300 hover:text-white">Docs</a>
              <a href="/components" className="text-gray-300 hover:text-white">Components</a>
              <a href="/blocks" className="text-gray-300 hover:text-white">Blocks</a>
              <a href="/charts" className="text-gray-300 hover:text-white">Charts</a>
              <a href="/themes" className="text-gray-300 hover:text-white">Themes</a>
              <a href="/colors" className="text-gray-300 hover:text-white">Colors</a>
            </nav>
          </div>

          {/* Right section with search, buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-900 rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none text-gray-300 focus:outline-none focus:ring-0 pl-2 pr-4 w-48"
              />
              <span className="text-gray-500 text-sm">⌘K</span>
            </div>

            <a href="https://github.com" className="text-gray-400 hover:text-white">
              <Github className="w-5 h-5" />
            </a>

            <button className="text-gray-400 hover:text-white">
              <Sun className="w-5 h-5" />
            </button>

            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;