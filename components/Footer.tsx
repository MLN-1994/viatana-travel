'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
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

  return (
    <footer className="bg-gray-900 text-white" id="contacto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">✈️ Viatana Travel</h3>
            <p className="text-gray-300 mb-4">
              Tu agencia de viajes de confianza. Creamos experiencias inolvidables en los destinos más increíbles.
            </p>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-[#6A3B76]">
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[#6A3B76]">
                  {contactInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>💬</span>
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">🔗 Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#paquetes" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Paquetes
                </Link>
              </li>
              <li>
                <Link href="/#ofertas" className="text-gray-300 hover:text-[#6A3B76] transition">
                  Ofertas
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
            <h4 className="text-xl font-bold mb-4">📧 Contáctanos</h4>
            <p className="text-gray-300 mb-4">
              Envíanos tu consulta y te responderemos lo antes posible
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu correo electrónico"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Tu teléfono (opcional)"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tu mensaje"
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white placeholder-gray-400 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              {contactInfo.twitter && (
                <a
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#1da1f2] rounded-full flex items-center justify-center transition"
                >
                  <FaTwitter className="text-xl" />
                </a>
              )}
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

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${contactInfo.whatsapp}?text=Hola! Me gustaría recibir información sobre sus paquetes de viaje`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl transition-all transform hover:scale-110 z-50 flex items-center justify-center"
        title="Contáctanos por WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </footer>
  );
}
