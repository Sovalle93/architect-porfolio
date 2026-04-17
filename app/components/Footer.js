'use client';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { hacenTunisialt } from '../fontprovider';

export default function Footer() {
  return (
    <footer className="bg-[#b6a797] text-gray-800 py-12" style={hacenTunisialt.style}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-league">DSArquitectura</h3>
            <div className="mt-2 flex items-center">
              <span className="mr-2">Hecho por</span>
              <Link href="https://www.studioapolo.cl/" target="_blank" rel="noopener noreferrer">
                <img
                  // Modified Cloudinary URL with transformations
                  src="https://res.cloudinary.com/dmivjpb65/image/upload/e_make_transparent:50/f_png/v1745007297/Screenshot_2025-04-18_161258_zuv9xb.png"
                  alt="Studio Apolo Logo"
                  className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="https://www.instagram.com/dsubercaseaux_arq" className="hover:text-gray-600 transition-colors duration-200 flex items-center space-x-2" aria-label="Instagram">
              <FaInstagram size={20} />
              <span className="font-league">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/studio-apolo-cl/" className="hover:text-gray-600 transition-colors duration-200 flex items-center space-x-2" aria-label="LinkedIn">
              <FaLinkedin size={20} />
              <span className="font-league">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700/30 text-center">
          <p>© {new Date().getFullYear()} DSArquitectura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}