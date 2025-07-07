// src/components/SekolahList.jsx
import { useEffect, useState } from "react";
import SiswaBySekolah from "./SiswaBySekolah";
import { FiSearch, FiChevronRight, FiArrowLeft } from "react-icons/fi";

const SekolahList = () => {
  const [data, setData] = useState([]);
  const [jumlahPerSekolah, setJumlahPerSekolah] = useState({});
  const [sekolahDipilih, setSekolahDipilih] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        const grouped = {};
        json.forEach((s) => {
          const sekolah = s["Asal Sekolah"];
          grouped[sekolah] = (grouped[sekolah] || 0) + 1;
        });
        setJumlahPerSekolah(grouped);
      });
  }, []);

  if (sekolahDipilih) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center">
          <button 
            onClick={() => setSekolahDipilih(null)}
            className="mr-3 p-1 rounded-full hover:bg-gray-100"
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {sekolahDipilih}
          </h2>
        </div>
        <SiswaBySekolah sekolahDipilih={sekolahDipilih} />
      </div>
    );
  }

  // Filter + Pagination
  const sekolahFiltered = Object.entries(jumlahPerSekolah)
    .filter(([sekolah]) =>
      sekolah.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(([a], [b]) => a.localeCompare(b));

  const totalPages = Math.ceil(sekolahFiltered.length / itemsPerPage);
  const displayed = sekolahFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari sekolah..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* School List */}
      <div className="grid gap-3">
        {displayed.map(([sekolah, jumlah], i) => (
          <button
            key={i}
            onClick={() => setSekolahDipilih(sekolah)}
            className="group bg-white p-4 w-full text-left rounded-lg border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                {sekolah}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {jumlah} siswa terdaftar
              </p>
            </div>
            <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default SekolahList;