'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contactInfo } from '@/data/packages';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-xs lg:text-sm border-b">
          <div className="flex items-center gap-3 lg:gap-4 text-gray-600">
            <a href="tel:1147899755" className="hover:text-[#6A3B76] transition">
              11 4789-9755
            </a>
            <a href={`mailto:${contactInfo.email}`} className="hover:text-[#6A3B76] transition">
              {contactInfo.email}
            </a>
          </div>
          <div className="flex gap-3">
            {contactInfo.facebook && (
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6A3B76] transition">
                <FaFacebookSquare className="text-xl" />
              </a>
            )}
            {contactInfo.instagram && (
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6A3B76] transition">
                <FaInstagram className="text-xl" />
              </a>
            )}
            {/* Twitter eliminado */}
          </div>
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo%20largo%20violeta.png"
              alt="Viatana Travel Logo"
              className="h-10 w-auto object-contain"
              style={{ maxWidth: '180px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base">
            <Link href="/" className="text-gray-700 hover:text-[#6A3B76] font-medium transition">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#6A3B76] font-medium transition">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-gray-700 hover:text-[#6A3B76] font-medium transition">
              Contacto
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 text-2xl"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-gray-700 hover:text-[#6A3B76] font-medium py-2">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#6A3B76] font-medium py-2">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-gray-700 hover:text-[#6A3B76] font-medium py-2">
              Contacto
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
