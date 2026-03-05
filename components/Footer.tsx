'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp, FaFacebook, FaInstagram, FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('¡Mensaje enviado! Te contactaremos pronto.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatusMessage('Error al enviar. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Error al enviar. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const wspMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (wspMenuRef.current && !wspMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <footer className="bg-gray-900 text-white" id="contacto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Viatana Travel</h3>
            <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
              Tu agencia de viajes de confianza.
            </p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-[#6A3B76] transition">
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[#6A3B76] transition">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Contáctanos</h4>
            <p className="text-gray-300 text-sm mb-3 md:mb-4">
              Envíanos tu consulta
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-2 md:space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
                className="w-full px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu correo"
                required
                className="w-full px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Teléfono (opcional)"
                className="w-full px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tu mensaje"
                required
                rows={3}
                className="w-full px-3 md:px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-semibold py-2.5 md:py-3 px-6 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
            {statusMessage && (
              <p className={`mt-3 text-sm ${statusMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {statusMessage}
              </p>
            )}
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Viatana Travel. Todos los derechos reservados.
            </p>
            
            {/* Social media icons */}
            <div className="flex gap-4">
              {contactInfo.facebook && (
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#1877f2] rounded-full flex items-center justify-center transition"
                >
                  <FaFacebook className="text-xl" />
                </a>
              )}
              {contactInfo.instagram && (
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-500 rounded-full flex items-center justify-center transition"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
              {/* Twitter eliminado */}
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#25d366] rounded-full flex items-center justify-center transition"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button - Solo visible en páginas públicas */}
      {!isAdminRoute && (
        <div ref={wspMenuRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
          {/* Menú Desplegable */}
          {isOpen && (
            <div className="mb-4 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
              <a
                href={`https://wa.me/${contactInfo.whatsappAmba}?text=Hola! Quiero información.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl border border-green-500 hover:bg-green-50 transition-colors flex items-center gap-2"
                aria-label="Contactar por WhatsApp AMBA"
              >
                <FaWhatsapp className="text-xl text-black" />
                <span className="font-medium">AMBA</span>
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsappInterior}?text=Hola! Quiero información.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl border border-green-500 hover:bg-green-50 transition-colors flex items-center gap-2"
                aria-label="Contactar por WhatsApp Interior"
              >
                <FaWhatsapp className="text-xl text-black" />
                <span className="font-medium">Interior</span>
              </a>
            </div>
          )}

          {/* Botón Principal Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
            title="Opciones de contacto"
            aria-label="Mostrar opciones de WhatsApp"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {isOpen ? <FaChevronUp className="text-xl" /> : <FaWhatsapp className="text-2xl md:text-3xl" />}
          </button>
        </div>
      )}
    </footer>
  );
}
