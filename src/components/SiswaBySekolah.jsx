// src/components/SiswaBySekolah.jsx
import { useEffect, useState } from "react";
import ModalDetail from "./ModalDetail";
import { FiSearch, FiArrowLeft, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const SiswaBySekolah = ({ sekolahDipilih, onBack }) => {
  const [data, setData] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((json) => {
        const filtered = json.filter(
          (siswa) => siswa["Asal Sekolah"] === sekolahDipilih
        );
        setData(filtered);
      });
  }, [sekolahDipilih]);

  const filteredSiswa = data
    .filter((s) =>
      s["Nama Peserta"].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a["Nama Peserta"].localeCompare(b["Nama Peserta"]));

  const totalPages = Math.ceil(filteredSiswa.length / itemsPerPage);
  const displayed = filteredSiswa.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}

      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
        
        <p className="text-gray-500 mb-4">{filteredSiswa.length} Siswa terdaftar</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama siswa..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Student List */}
        {displayed.length > 0 ? (
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {displayed.map((siswa, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedSiswa(siswa)}
                  className="bg-white hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="px-4 py-3">
                    <div className="font-medium text-gray-800">{siswa["Nama Peserta"]}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">NISN: {siswa["NISN"] || '-'}</span>
                      <span className="text-sm text-gray-500">Lahir: {siswa["Tanggal Lahir"] || '-'}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            Tidak ada siswa yang ditemukan
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <div className="text-sm text-gray-500">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredSiswa.length)} dari {filteredSiswa.length} siswa
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
      </div>

      {/* Modal detail */}
      <ModalDetail siswa={selectedSiswa} onClose={() => setSelectedSiswa(null)} />
    </div>
  );
};

export default SiswaBySekolah;