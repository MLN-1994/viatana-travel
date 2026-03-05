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
  const whatsappMessage = `Hola! Estoy interesado en el paquete: ${pkg.title}. Me gustaría recibir más información.`;
  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(106,59,118,0.15)] flex flex-col h-full hover:-translate-y-2 hover:border-[#6A3B76]/30 max-w-[400px] mx-auto w-full">

      {/* Contenedor de Imagen */}
      <div className="relative h-52 md:h-64 overflow-hidden shrink-0">
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
      {/* Contenido - Añadimos flex-1 y grow para que este contenedor ocupe el espacio sobrante */}
<div className="p-5 flex flex-col flex-1 grow">
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
    {/* min-h-[3rem] asegura que el título siempre reserve espacio para 2 líneas */}
           <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] leading-tight md:min-h-[3rem] group-hover:text-[#6A3B76] transition-colors">
      {pkg.title}
    </h3>
  </Link>

  {/* La descripción empujará el footer hacia abajo uniformemente */}
         <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
    {pkg.description}
  </p>

  {/* Footer de la Card - El mt-auto es clave aquí para anclar los botones al fondo */}
  <div className="pt-2 border-t border-slate-100 mt-auto">
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col">
        {pkg.isOffer && pkg.originalPrice && (
          <span className="text-gray-400 line-through text-xs font-medium">
            {pkg.currency === 'ARS' ? 'ARS $' : 'USD'} {pkg.originalPrice}
          </span>
        )}
        <span className="text-xs text-gray-500 font-semibold mb-0.5">Desde</span>
        <div className="flex items-baseline gap-1">
          <span className="text-sm lg:text-lg font-bold text-[#6A3B76]">{pkg.currency === 'ARS' ? 'ARS $' : 'USD'}</span>
          <span className="text-xl font-bold text-gray-900 tracking-tighter">{pkg.price}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest leading-tight text-right">
        Por persona <br /> en base doble
      </span>
    </div>

    <div className="grid grid-cols-12 gap-2">
      <Link
        href={`/packages/${pkg.id}`}
        className="col-span-8 bg-[#6A3B76] hover:bg-[#5a2f66] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
      >
        Detalles
      </Link>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl transition-all flex items-center justify-center shadow-lg shadow-green-100"
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
