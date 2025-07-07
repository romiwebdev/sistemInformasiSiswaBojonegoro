// src/components/Sidebar.jsx
import { FiUsers, FiHome, FiCalendar, FiBarChart2 } from "react-icons/fi";

const Sidebar = ({ setSelectedMenu }) => {
  const menus = [
    { name: "Siswa", icon: <FiUsers className="mr-3" /> },
    { name: "Sekolah", icon: <FiHome className="mr-3" /> },
    { name: "Tahun", icon: <FiCalendar className="mr-3" /> },
    { name: "Stats", icon: <FiBarChart2 className="mr-3" /> }
  ];

  return (
    <div className="p-6 space-y-2 md:h-screen flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Menu</h2>
        <div className="w-12 h-1 bg-indigo-300 rounded-full"></div>
      </div>
      
      <nav className="flex-1">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setSelectedMenu(menu.name)}
            className="flex items-center w-full text-left py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-2 text-white hover:shadow-md"
          >
            {menu.icon}
            <span className="font-medium">{menu.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;