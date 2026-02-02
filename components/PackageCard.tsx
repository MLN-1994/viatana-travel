'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TravelPackage } from '@/types';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

interface PackageCardProps {
  package: TravelPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const whatsappMessage = `Hola! Estoy interesado en el paquete: ${pkg.title} - ${pkg.destination}. Me gustaría recibir más información.`;
  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(106,59,118,0.15)] flex flex-col h-full hover:-translate-y-2 hover:border-[#6A3B76]/30">
      
      {/* Contenedor de Imagen */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <Link href={`/packages/${pkg.id}`} className="block h-full w-full">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradiente para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </Link>

        {/* Tags superiores */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-[#6A3B76] shadow-sm">
            {pkg.category}
          </span>
          {pkg.isOffer && (
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-lg animate-pulse">
              {pkg.discount}% OFF
            </span>
          )}
        </div>

        {/* Botón flotante de "Ver más" que aparece al hacer hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <Link 
            href={`/packages/${pkg.id}`}
            className="bg-white text-[#6A3B76] p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto hover:bg-[#6A3B76] hover:text-white"
          >
            <FaArrowRight className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-1.5 text-[#6A3B76] font-bold text-xs uppercase tracking-tighter">
            <FaMapMarkerAlt className="opacity-70" />
            {pkg.destination}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <FaClock className="opacity-50" />
            {pkg.duration}
          </div>
        </div>

        <Link href={`/packages/${pkg.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#6A3B76] transition-colors leading-tight min-h-[3rem]">
            {pkg.title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed grow">
          {pkg.description}
        </p>

        {/* Footer de la Card / Precios */}
        <div className="pt-5 border-t border-slate-50 mt-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col">
              {pkg.isOffer && pkg.originalPrice && (
                <span className="text-gray-400 line-through text-xs font-medium">
                  USD {pkg.originalPrice}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-gray-900 tracking-tighter">
                  <span className="text-sm font-bold text-[#6A3B76] mr-0.5">USD</span>{pkg.price}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest leading-none">
              Por<br/>persona
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="col-span-3 bg-[#6A3B76] hover:bg-[#5a2f66] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
            >
              Detalles
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl transition-all flex items-center justify-center shadow-lg shadow-green-100"
              title="Consultar por WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
