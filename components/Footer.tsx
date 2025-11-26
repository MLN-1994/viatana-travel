'use client';

import { useState } from 'react';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí puedes implementar la integración con tu servicio de newsletter
    // Por ahora simularemos el envío
    setTimeout(() => {
      setMessage('¡Gracias por suscribirte! Pronto recibirás nuestras ofertas.');
      setEmail('');
      setIsSubmitting(false);
      
      setTimeout(() => setMessage(''), 5000);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white" id="contacto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-4">📧 Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Suscríbete para recibir las mejores ofertas y promociones exclusivas
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A3B76] text-white"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Suscribirse'}
              </button>
            </form>
            {message && (
              <p className="mt-3 text-green-400 text-sm">{message}</p>
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
