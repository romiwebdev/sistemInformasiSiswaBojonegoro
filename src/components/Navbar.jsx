// src/components/Navbar.jsx
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="hidden md:flex items-center justify-between bg-white shadow-sm px-8 py-4 border-b border-gray-100">
      {/* Add this to your main HTML file or _document.js */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');
      `}</style>
      
      <div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-sans" 
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>
          SISBJN
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-sans" 
           style={{ fontFamily: 'Inter, sans-serif' }}>
          Sistem Informasi Siswa Bojonegoro
        </p>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari..." 
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 font-sans"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <FiBell className="text-gray-600 w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center shadow-inner">
            <FiUser className="text-blue-600" />
          </div>
          <span className="text-gray-700 font-medium font-sans" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
            User
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;