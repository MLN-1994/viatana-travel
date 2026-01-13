'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contactInfo } from '@/data/packages';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 text-sm border-b">
          <div className="flex items-center gap-4 text-gray-600">
            <a href={`tel:${contactInfo.phone}`} className="hover:text-[#6A3B76] flex items-center gap-1">
              <span>📞</span>
              {contactInfo.phone}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="hover:text-[#6A3B76] hidden md:flex items-center gap-1">
              <span>✉️</span>
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
            {contactInfo.twitter && (
              <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6A3B76] transition">
                <FaTwitter className="text-xl" />
              </a>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-[#6A3B76]">
            ✈️ Viatana Travel
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-[#6A3B76] font-medium">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#6A3B76] font-medium">
              Sobre Nosotros
            </Link>
            <Link href="#paquetes" className="text-gray-700 hover:text-[#6A3B76] font-medium">
              Paquetes
            </Link>
            <Link href="#ofertas" className="text-gray-700 hover:text-[#6A3B76] font-medium">
              Ofertas
            </Link>
            <Link href="#contacto" className="text-gray-700 hover:text-[#6A3B76] font-medium">
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
              Sobre Nosotros
            </Link>
            <Link href="#paquetes" className="text-gray-700 hover:text-[#6A3B76] font-medium py-2">
              Paquetes
            </Link>
            <Link href="#ofertas" className="text-gray-700 hover:text-[#6A3B76] font-medium py-2">
              Ofertas
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
