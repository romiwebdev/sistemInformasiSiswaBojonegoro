// src/components/ModalDetail.jsx
import { FiX } from "react-icons/fi";

const ModalDetail = ({ siswa, onClose }) => {
  if (!siswa) return null;

  const detailItems = [
    { label: "Nama", value: siswa["Nama Peserta"] },
    { label: "Asal Sekolah", value: siswa["Asal Sekolah"] },
    { label: "Tanggal Lahir", value: siswa["Tanggal Lahir"] },
    { label: "Nomor Peserta", value: siswa["Nomor Peserta"] },
    { label: "Jenis Kelamin", value: siswa["Jenis Kelamin"] },
    { label: "NISN", value: siswa["NISN"] },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-bold text-gray-800">Detail Siswa</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {detailItems.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="text-gray-500 font-medium">{item.label}</div>
              <div className="col-span-2 text-gray-800">
                {item.value || "-"}
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;