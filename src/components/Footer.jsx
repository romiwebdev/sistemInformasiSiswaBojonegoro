// src/components/Footer.jsx
const Footer = () => {
    return (
      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-100 bg-white mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0">
              © 2025 Dinas Pendidikan Bojonegoro | All Rights Reserved
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;