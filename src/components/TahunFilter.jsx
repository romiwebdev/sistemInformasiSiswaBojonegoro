// src/components/TahunFilter.jsx
import { useEffect, useState } from "react";
import ModalDetail from "./ModalDetail";
import { FiCalendar, FiChevronDown, FiUsers, FiHome } from "react-icons/fi";

const TahunFilter = () => {
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState("");
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      });
  }, []);

  const filtered = tahun
    ? data.filter((s) => new Date(s["Tanggal Lahir"]).getFullYear().toString() === tahun)
    : data;

  const tahunUnik = Array.from(
    new Set(data.map(s => new Date(s["Tanggal Lahir"]).getFullYear()))
  ).sort((a, b) => b - a).filter(year => !isNaN(year));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FiCalendar className="mr-2 text-blue-600" />
          Filter Berdasarkan Tahun Lahir
        </h2>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiCalendar className="text-gray-400" />
          </div>
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Semua Tahun Lahir</option>
            {tahunUnik.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiChevronDown className="text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">
                {tahun ? `Tahun Lahir: ${tahun}` : 'Semua Tahun Lahir'}
              </h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {filtered.length} Siswa
              </span>
            </div>

            {filtered.length > 0 ? (
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {filtered.map((siswa, idx) => (
                    <li
                      key={idx}
                      onClick={() => setSelectedSiswa(siswa)}
                      className="bg-white hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <div className="px-4 py-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">{siswa["Nama Peserta"]}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {new Date(siswa["Tanggal Lahir"]).getFullYear()}
                          </span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <FiHome className="mr-1" />
                          {siswa["Asal Sekolah"]}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                Tidak ada siswa yang ditemukan
              </div>
            )}
          </>
        )}
      </div>

      {/* Menggunakan ModalDetail yang konsisten */}
      <ModalDetail 
        siswa={selectedSiswa} 
        onClose={() => setSelectedSiswa(null)} 
      />
    </div>
  );
};

export default TahunFilter;