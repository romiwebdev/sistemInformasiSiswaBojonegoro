// src/components/Stats.jsx
import { useEffect, useState } from "react";
import { FiHome, FiUsers, FiCalendar } from "react-icons/fi";

const Stats = () => {
  const [data, setData] = useState([]);
  const [totalSekolah, setTotalSekolah] = useState(0);
  const [totalSiswa, setTotalSiswa] = useState(0);
  const [rataTahun, setRataTahun] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setTotalSiswa(json.length);

        const sekolahUnik = new Set(json.map((s) => s["Asal Sekolah"]));
        setTotalSekolah(sekolahUnik.size);

        const tahunLahirValid = json
          .map((s) => new Date(s["Tanggal Lahir"]).getFullYear())
          .filter((tahun) => !isNaN(tahun));

        const rata =
          tahunLahirValid.reduce((a, b) => a + b, 0) /
          tahunLahirValid.length;

        setRataTahun(Math.round(rata));
        setIsLoading(false);
      });
  }, []);

  const stats = [
    {
      title: "Total Sekolah",
      value: totalSekolah,
      icon: <FiHome className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Siswa",
      value: totalSiswa,
      icon: <FiUsers className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-50"
    },
    {
      title: "Rata-rata Tahun Lahir",
      value: isNaN(rataTahun) ? "-" : rataTahun,
      icon: <FiCalendar className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Statistik Pendidikan</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl ${stat.bgColor} border border-gray-100`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1 text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;