// src/components/Dashboard.jsx
import SiswaList from "./SiswaList";
import TahunFilter from "./TahunFilter";
import Stats from "./Stats";
import SekolahList from "./SekolahList";

const Dashboard = ({ selectedMenu }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Dashboard Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-blue-600 w-1 h-6 rounded-full mr-3"></span>
            {selectedMenu}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manajemen data {selectedMenu.toLowerCase()} Kabupaten Bojonegoro
          </p>
        </div>
        
        {/* Content Area */}
        <div className="p-6">
          {selectedMenu === "Siswa" && <SiswaList />}
          {selectedMenu === "Tahun" && <TahunFilter />}
          {selectedMenu === "Stats" && <Stats />}
          {selectedMenu === "Sekolah" && <SekolahList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;