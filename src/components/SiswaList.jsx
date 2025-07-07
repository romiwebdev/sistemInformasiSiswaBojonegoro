// src/components/SiswaList.jsx
import { useEffect, useState } from "react";
import ModalDetail from "./ModalDetail";
import { FiSearch, FiChevronRight, FiChevronLeft, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const SiswaList = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.sort((a, b) =>
          a["Nama Peserta"].localeCompare(b["Nama Peserta"])
        );
        setData(sorted);
        setFiltered(sorted);
      });
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    const hasil = data.filter((s) =>
      s["Nama Peserta"].toLowerCase().includes(q)
    );
    setFiltered(hasil);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(start, start + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Student List */}
      <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        {currentData.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {currentData.map((siswa, i) => (
              <li
                key={i}
                onClick={() => setSelectedSiswa(siswa)}
                className="bg-white hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{siswa["Nama Peserta"]}</h3>
                    <p className="text-sm text-gray-500 mt-1">{siswa["Asal Sekolah"]}</p>
                  </div>
                  <FiChevronRight className="text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Tidak ada data siswa yang ditemukan
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-sm text-gray-500">
            Menampilkan {start + 1}-{Math.min(start + itemsPerPage, filtered.length)} dari {filtered.length} siswa
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1 mx-2">
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
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <ModalDetail
        siswa={selectedSiswa}
        onClose={() => setSelectedSiswa(null)}
      />
    </div>
  );
};

export default SiswaList;