// src/App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FiMenu } from "react-icons/fi";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Siswa");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold tracking-tight">SISBJN</h1>
        <button 
          onClick={() => setShowSidebar(true)} 
          className="text-2xl p-1 rounded-md hover:bg-blue-700 transition-colors"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Mobile */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-blue-700 to-indigo-800 text-white z-50 p-6 shadow-xl transform transition-transform duration-300 ease-in-out">
            <Sidebar setSelectedMenu={handleSelectMenu} />
          </div>
        </>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:flex md:w-72 bg-gradient-to-b from-blue-700 to-indigo-800 text-white shadow-lg">
        <Sidebar setSelectedMenu={handleSelectMenu} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Navbar (desktop only) */}
        <Navbar />

        {/* Dashboard */}
        <div className="flex-1 p-6">
          <Dashboard selectedMenu={selectedMenu} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;