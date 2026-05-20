
import React from "react";
import { FaWhatsapp } from 'react-icons/fa';
import { getSiteSettings } from '@/lib/site-settings';
import { contactInfo } from '@/data/packages';

export default async function Headline() {
  const s = await getSiteSettings();

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-white">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-200 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1] mb-4">
          {s.headline_title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A3B76] to-purple-600">
            {s.headline_title_highlight}
          </span>
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          {s.headline_subtitle}
        </h3>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {s.headline_paragraph}
        </p>

        {/* Call to Action WhatsApp */}
        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${contactInfo.whatsappAmba}?text=Hola! Quiero información.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6A3B76] to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all text-lg active:scale-95"
          >
            <FaWhatsapp className="w-6 h-6" />
            {s.headline_cta_text}
          </a>
        </div>
      </div>
    </section>
  );
}